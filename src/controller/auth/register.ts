import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { user as isUser } from "@models";
import { getUserByEmail, getUserByUsername, arrappend } from "@redis";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register: RequestHandler = async (req, res) => {
  let user = req.body;
  user = {
    id: uuidv4(),
    ...user,
    admin: false,
    createdAt: `${new Date().toISOString()}`,
  };
  if (isUser(user)) {
    const at = jwt.sign({ sub: user.id }, process.env.SEED, {
      expiresIn: "120m",
    });
    const rt = jwt.sign({ sub: user.id }, process.env.SEED, {
      expiresIn: "7d",
    });

    let query = await getUserByEmail(user.email);
    if (query.length < 1) {
      query = await getUserByUsername(user.username);
      if (query.length < 1) {
        user.password = bcrypt.hashSync(user.password, 10);
        await arrappend("users", ".", JSON.stringify(user));
        let obj = {
          id: user.id,
          email: user.email,
          username: user.username,
          createdAt: user.createdAt,
          accessToken: at,
          refreshToken: rt,
        };
        res.json(obj);
      } else {
        res.json({ error: "Username is already taken" });
      }
    } else {
      res.json({ error: "Email is already taken" });
    }
  } else {
    console.log(isUser.errors);
  }
};
