import { get } from "../redis";

export const posts = async (req, res) => {
  const jres = await get("posts", ".");
  res.setHeader('Content-Type', 'application/json');
  res.send(jres);
};
