import * as express from "express";
import { posts } from "./controller/posts";
import { client, set } from "./redis";

const main = async () => {
  await client.connect();
  const app = express();
  const port = 8080;

  app.get("/posts", posts);

  app.listen(port);
};

process.on("exit", async () => {
  client.disconnect;
});

main();
