import * as express from "express";
import { posts } from "./controller/posts";
import { client, arrappend, get } from "./redis";
import { v4 as uuidv4 } from "uuid";

const tokenTest = async () => {
  for (let i = 0; i < 10; i++) {
    await client.arrappend("tokens", [JSON.stringify(uuidv4())], ".");
  }
  console.log(await get("tokens", "."));
};

const main = async () => {
  await client.connect();
  const app = express();
  const port = 8080;

  app.get("/posts", posts);
  tokenTest();
  app.listen(port);
};

process.on("exit", async () => {
  client.disconnect;
});

main();
