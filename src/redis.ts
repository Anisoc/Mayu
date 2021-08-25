import { ReJSON } from "redis-modules-sdk";
import expect from "expect";
import jp from "jsonpath";

export const client = new ReJSON({
  host: "localhost",
  port: 6379,
});

export const set = async (k, p, v) => {
  const res = await client.set(k, p, v);
  if (expect(res).toBe("OK")) {
    return res;
  }
};

export const get = async (k, p) => {
  return await client.get(k, p);
};

export const arrappend = async (k, p, j) => {
  return await client.arrappend(k, j, p);
};

export const connect = async () => {
  return await client.connect();
};

export const disconnect = async () => {
  return await client.disconnect();
};

export const getUserById = async (id) => {
  let users = JSON.parse(await get("users", "."));
  return jp.query(users, `$[?(@.id=="${id}")]`);
};

export const getUserByEmail = async (email) => {
  let users = JSON.parse(await get("users", "."));
  return jp.query(users, `$[?(@.email=="${email}")]`);
};

export const getUserByUsername = async (username) => {
  let users = JSON.parse(await get("users", "."));
  return jp.query(users, `$[?(@.username=="${username}")]`);
};

export const getToken = async (token) => {
  let tokens = JSON.parse(await get("tokens", "."));
  let res = jp.paths(tokens, `$[?(@=="${token}")]`);
  return parseInt(`${res[0][1]}`);
};

export const delToken = async (token) => {
  return await client.arrpop("tokens", await getToken(token), ".");
};
