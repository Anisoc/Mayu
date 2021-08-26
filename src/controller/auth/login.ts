import { RequestHandler } from "express";
import { getUserByEmail, arrappend } from "@redis";
import { user as isUser } from "@models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login: RequestHandler = async (req, res) => {
  const user = await (await getUserByEmail(req.body.email)).shift();

  if (isUser(user)) {
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      const at = jwt.sign({ sub: user.id }, process.env.SEED, {
        expiresIn: "120m",
      });
      const rt = jwt.sign({ sub: user.id }, process.env.SEED, {
        expiresIn: "7d",
      });

      arrappend("tokens", ".", [JSON.stringify(rt)]).catch(async (err) => {
        throw err;
      });

      return res.json({
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        accessToken: at,
        refreshToken: rt,
      });
    }
  }
  return res.json({ error: "Oops, you typed something incorrectly!" });
};
