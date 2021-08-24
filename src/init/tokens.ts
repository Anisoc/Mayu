import { arrappend, get, set } from "@redis";
import { v4 as uuidv4 } from "uuid";

export const tokensInit = async () => {
  let tokens = JSON.parse(await get("tokens", "."));
  if (!tokens || !tokens.length) {
    await set("tokens", ".", "[]");
  }
};
