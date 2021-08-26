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
      password: "$2b$10$B7OqGcu3AQ7QpeiZB8c3sOVQBij2PEIr7TcdklM.KOM8YsAoz/Uz.",
      createdAt: "2021-08-26T14:43:49.429Z",
      admin: true,
    };
    await arrappend("users", ".", [JSON.stringify(obj)]);
  }
};
