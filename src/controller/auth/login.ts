import { RequestHandler } from "express";
import { getUserByEmail, arrappend } from "@redis";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login: RequestHandler = async (req, res) => {
  const user = await getUserByEmail(req.body.email);

  if (user.length == 1) {
    const result = await bcrypt.compare(req.body.password, user[0].password);
    if (result) {
      const at = jwt.sign({ sub: user[0].id }, process.env.SEED, {
        expiresIn: "120m",
      });
      const rt = jwt.sign({ sub: user[0].id }, process.env.SEED, {
        expiresIn: "7d",
      });

      arrappend("tokens", ".", [JSON.stringify(rt)]).catch(async (err) => {
        throw err;
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
  }
  return res.json({ error: "Oops, you typed something incorrectly!" });
};
