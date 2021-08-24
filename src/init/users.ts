import { arrappend, get, set } from "@redis";
import { v4 as uuidv4 } from "uuid";

export const usersInit = async () => {
  let users = JSON.parse(await get("users", "."));
  if (!users || !users.length) {
    await set("users", ".", "[]");
    for (let i = 0; i < 10; i++) {
      let obj = {
        id: uuidv4(),
        email: `${i}@gmail.com`,
        username: `${i}`,
        password: `${i}`,
        admin: 1,
      };
      await arrappend("users", ".", [JSON.stringify(obj)]);
    }
  }
  users = JSON.parse(await get("users", "."));
  console.log(users);
};
