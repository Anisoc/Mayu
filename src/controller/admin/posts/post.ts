import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { isPost } from "@models";
import { getUserById, arrappend } from "@redis";
import { isUser } from "@models";
import jwt from "jsonwebtoken";

export const post: RequestHandler = async (req, res) => {
  const t = req?.headers?.authorization?.split(" ").reverse().shift();
  return await jwt.verify(t, process.env.SEED, async (err, token) => {
    if (token.sub) {
      const user = await getUserById(token.sub);
      if (isUser(user)) {
        if (user.admin) {
          const post = {
            id: uuidv4(),
            ...req.body,
            timestamp: `${new Date().toISOString()}`,
          };

          if (isPost(post)) {
            // TODO: send post to discord, github, and facebook
            // TODO: add post to database with platforms IDs
          }
          return res.json({ error: isPost.errors });
        }
        return res.sendStatus(403);
      }
      return res.json({ error: isUser.errors });
    }
    return res.json({ error: "Oops something went wrong!" });
  });
};
