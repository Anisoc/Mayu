import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { post as isPost } from "@models";
import { getUserById, arrappend } from "@redis";
import { isUser } from "@models";
import jwt from "jsonwebtoken";

export const post: RequestHandler = async (req, res) => {
  let t = req?.headers?.authorization?.split(" ").reverse().shift();
  await jwt.verify(t, process.env.SEED, async (err, token) => {
    if (token.sub) {
      const user = await getUserById(token.sub);
      if (isUser(user)) {
      }
      res.json(user);
    }
  });
};
