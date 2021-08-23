import { ReJSON } from "redis-modules-sdk";
import * as expect from "expect";

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
