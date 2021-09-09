import client from "@redis";

export const getUserById = async (id) => {
  const users = JSON.parse(await get("users", "."));
  return jp.query(users, `$[?(@.id=="${id}")]`);
};

export const getUserByEmail = async (email) => {
  const users = JSON.parse(await get("users", "."));
  return jp.query(users, `$[?(@.email=="${email}")]`);
};

export const getUserByUsername = async (username) => {
  const users = JSON.parse(await get("users", "."));
  return jp.query(users, `$[?(@.username=="${username}")]`);
};

export const getToken = async (token) => {
  const tokens = JSON.parse(await get("tokens", "."));
  const res = jp.paths(tokens, `$[?(@=="${token}")]`);
  const index = parseInt(`${res[0][1]}`);
  if (typeof index === "number" && index % 1 === 0) return index;
  return [];
};

export const delToken = async (index) => {
  if (typeof index === "number" && index % 1 === 0)
    return await client.arrpop("tokens", index, ".");
  throw { error: "incorrect type" };
};
