import { get } from "../redis";

export const posts = async (req, res) => {
  const jres = await get("posts", ".");
  res.send(jres);
};
