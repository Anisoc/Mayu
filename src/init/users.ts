import { arrappend, get, set } from "@redis";
import { v4 as uuidv4 } from "uuid";

export const usersInit = async () => {
  let users = JSON.parse(await get("users", "."));
  if (!users || !users.length) {
    await set("users", ".", "[]");
    let obj = {
      id: uuidv4(),
      email: `admin@test.com`,
      username: `admin`,
      password: "",
      admin: true,
    };
    await arrappend("users", ".", [JSON.stringify(obj)]);
  }
};
