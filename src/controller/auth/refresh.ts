import { RequestHandler } from "express";
import { getUserById, getToken, arrappend, delToken } from "@redis";
import { isUser } from "@models";
import jwt from "jsonwebtoken";

export const refresh: RequestHandler = async (req, res) => {
  await jwt.verify(
    req.body.refreshToken,
    process.env.SEED,
    async (err, token) => {
      if (err) {
        return res.sendStatus(403);
      }

      const user = await (await getUserById(token.sub)).shift();
      const t = await getToken(req.body.refreshToken);

      if (isUser(user) && !(t instanceof Array)) {
        const at = jwt.sign({ sub: user.id }, process.env.SEED, {
          expiresIn: "120m",
        });

        const rt = jwt.sign({ sub: user.id }, process.env.SEED, {
          expiresIn: "7d",
        });

        await arrappend("tokens", ".", [JSON.stringify(rt)]);
        await delToken(t);

        return res.json({
          id: user.id,
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
          accessToken: at,
          refreshToken: rt,
        });
      }

      return res.sendStatus(403);
    }
  );
};
