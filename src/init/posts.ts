import { client, arrappend, get, set } from "@redis";
import { v4 as uuidv4 } from "uuid";

export const postsInit = async () => {
  let posts = JSON.parse(await get("tokens", "."));
  if (!posts || !posts.length) {
    await set("posts", ".", "[]");
    for (let i = 0; i < 10; i++) {
      let obj = {
        id: uuidv4(),
        title: `${i}`,
        content: "hi",
        timestamp: Date(),
      };
      await arrappend("tokens", ".", [JSON.stringify(obj)]);
    }
  }
  posts = JSON.parse(await get("tokens", "."));
  console.log(posts);
};
