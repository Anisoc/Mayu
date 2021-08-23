import { arrappend, get, set } from "@redis";
import { v4 as uuidv4 } from "uuid";

export const postsInit = async () => {
  let posts = JSON.parse(await get("posts", "."));
  if (!posts || !posts.length) {
    await set("posts", ".", "[]");
    for (let i = 0; i < 10; i++) {
      let obj = {
        id: uuidv4(),
        content: `${i}`,
        timestamp: Date(),
      };
      await arrappend("posts", ".", [JSON.stringify(obj)]);
    }
  }
  posts = JSON.parse(await get("posts", "."));
  console.log(posts);
};
