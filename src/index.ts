import express from "express";
import { posts } from "@controller/posts";
import { disconnect, connect } from "@redis";
import { init } from "@init";
import { login, register, refresh } from "@auth";
import { post } from "@posts";
import nocache from "nocache";
import eJwt from "express-jwt";

const main = async () => {
  await connect()
    .then(async (res) => {
      await init();
    })
    .catch((err) => {
      throw err;
    });
  const app = express();
  const port = process.env.PORT;

  app.set("etag", false);
  app.use(nocache());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(
    eJwt({
      secret: process.env.SEED,
      algorithms: ["HS256"],
    }).unless({
      path: ["/auth/login", "/auth/register", "/auth/refresh", "/posts"],
    })
  );

  app.get("/posts", posts);
  app.post("/auth/login", login);
  app.post("/auth/register", register);
  app.post("/auth/refresh", refresh);
  app.post("/admin/post", post);

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

process.on("exit", async () => {
  disconnect;
});

main();
