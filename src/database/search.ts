import client from "@redis";
import jp from "jsonpath";

export const getUserById = async (id) => {
  const users = JSON.parse(await client.json.get("users", "."));
  return jp.query(users, `$[?(@.id=="${id}")]`);
};

export const getUserByEmail = async (email) => {
  const users = JSON.parse(await client.json.get("users", "."));
  return jp.query(users, `$[?(@.email=="${email}")]`);
};

export const getUserByUsername = async (username) => {
  const users = JSON.parse(await client.json.get("users", "."));
  return jp.query(users, `$[?(@.username=="${username}")]`);
};

export const getToken = async (token) => {
  console.log(await client.search.search("token-idx", token));
  const tokens = JSON.parse(await client.json.get("tokens", "."));
  const res = jp.paths(tokens, `$[?(@=="${token}")]`);
  if (res.length > 0) {
    const index = parseInt(`${res[0][1]}`);
    if (typeof index === "number" && index % 1 === 0) return index;
  }
  return [];
};

export const delToken = async (index) => {
  if (typeof index === "number" && index % 1 === 0)
    return await client.json.arrpop("tokens", index, ".");
  throw { error: "incorrect type" };
};
