import * as express from "express";
import { posts } from "@controller/posts";
import { client } from "@redis";
import { postsInit, tokensInit } from "@init";
const main = async () => {
  await client.connect();
  const app = express();
  const port = 8080;

  app.get("/posts", posts);
  tokensInit();
  postsInit();
  app.listen(port);
};

process.on("exit", async () => {
  client.disconnect;
});

main();
