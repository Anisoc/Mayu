import express, { Request, Response } from "express";
import { posts } from "@controller/posts";
import { client } from "@redis";
import { postsInit, tokensInit, usersInit } from "@init";
import { login, register } from "@auth";

const main = async () => {
  await client.connect();
  const app = express();
  const port = 8080;

  tokensInit();
  postsInit();
  usersInit();

  app.get("/posts", posts);
  app.post("/auth/login", login);
  app.post("/auth/register", register);

  app.listen(port);
};

process.on("exit", async () => {
  client.disconnect;
});

main();
