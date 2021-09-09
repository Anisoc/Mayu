import client from "@redis";
import expect from "expect";

export const set = async (k, p, v) => {
  const res = await client.json.set(k, p, v);
  if (expect(res).toBe("OK")) {
    return res;
  }
};

export const get = async (k, p) => {
  return await client.json.get(k, p);
};

export const arrappend = async (k, p, j) => {
  return await client.json.arrappend(k, j, p);
};
