import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { post as validate } from "@models";
import { getUserById, arrappend } from "database/redis";
import jwt from "jsonwebtoken";

export const post: RequestHandler = async (req, res) => {
  console.log(req.headers.authorization);
  await jwt.verify(
    req.headers.authorization,
    process.env.SEED,
    async (err, token) => {}
  );
};
