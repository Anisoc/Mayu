import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { isPost } from "@models";
import { getUserById, arrappend } from "@redis";
import { isUser } from "@models";
import jwt from "jsonwebtoken";

export const post: RequestHandler = async (req, res) => {
  const t = req?.headers?.authorization?.split(" ").reverse().shift();
  await jwt.verify(t, process.env.SEED, async (err, token) => {
    if (token.sub) {
      const user = await getUserById(token.sub);
      if (isUser(user)) {
        if (user.admin) {
          let post = req.body;
          post = {
            id: uuidv4(),
            ...post,
            timestamp: `${new Date().toISOString()}`,
          };

          if (isPost(post)) {
            // TODO: send post to discord, github, and facebook
            // TODO: add post to database with platforms IDs
          }
        }
        return res.sendStatus(403);
      }
    }
    return res.json({ error: "Oops something went wrong!" });
  });
};
