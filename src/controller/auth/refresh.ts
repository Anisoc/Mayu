import { RequestHandler } from "express";
import { getUserById, getToken } from "@redis";
import jwt from "jsonwebtoken";

export const refresh: RequestHandler = async (req, res) => {
  jwt.verify(req.body.refreshToken, process.env.SEED, async (err, token) => {
    if (err) {
      return res.sendStatus(403);
    }

    let user = await getUserById(token.sub);
    console.log(token);
    console.log(user);

    if (user && getToken(token)) {
      const at = jwt.sign({ sub: user[0].id }, process.env.SEED, {
        expiresIn: "120m",
      });

      const rt = jwt.sign({ sub: user[0].id }, process.env.SEED, {
        expiresIn: "7d",
      });

      return res.json({
        id: user[0].id,
        email: user[0].email,
        username: user[0].username,
        createdAt: user[0].createdAt,
        accessToken: at,
        refreshToken: rt,
      });
    }

    return res.status(403);
  });
};
