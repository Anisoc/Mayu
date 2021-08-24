import { arrappend, get, set } from "@redis";
import { v4 as uuidv4 } from "uuid";

export const emailsInit = async () => {
  let emails = JSON.parse(await get("emails", "."));
  if (!emails || !emails.length) {
    await set("emails", ".", "[]");
  }
  emails = JSON.parse(await get("emails", "."));
};
