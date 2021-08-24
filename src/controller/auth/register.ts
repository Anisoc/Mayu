import { RequestHandler } from "express";
import { v4 as uuidv4 } from "uuid";
import { user as validate } from "@models";
import { getUserByEmail, getUserByUsername, arrappend } from "@redis";

export const register: RequestHandler = async (req, res) => {
  let user = req.body;
  user = { id: uuidv4(), ...user, admin: false };
  if (validate(user)) {
    let query = await getUserByEmail(user.email);
    if (query.length < 1) {
      query = await getUserByUsername(user.username);
      if (query.length < 1) {
        await arrappend("users", ".", JSON.stringify(user));
        res.json(user);
      } else {
        res.json({ error: "Username is already taken" });
      }
    } else {
      res.json({ error: "Email is already taken" });
    }
  } else {
    console.log(validate.errors);
  }
};
