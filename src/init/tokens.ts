import { arrappend, get, set } from "@redis";
import { v4 as uuidv4 } from "uuid";

export const tokensInit = async () => {
  let tokens = JSON.parse(await get("tokens", "."));
  if (!tokens || !tokens.length) {
    await set("tokens", ".", "[]");
    for (let i = 0; i < 10; i++) {
      await arrappend("tokens", ".", [JSON.stringify(uuidv4())]);
    }
  }
  tokens = JSON.parse(await get("tokens", "."));
  console.log(tokens);
};
