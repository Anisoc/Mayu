import { ReJSON, Redisearch } from "redis-modules-sdk";
export { get, set, arrappend } from "@redis/json";

const client = {
  json: new ReJSON({
    host: process.env.REDIS_ADDR,
    port: process.env.REDIS_PORT,
  }),
  search: new Redisearch({
    host: process.env.REDIS_ADDR,
    port: process.env.REDIS_PORT,
  }),
};

export default client;

export const connect = async () => {
  return {
    json: await client.json.connect(),
    search: await client.search.connect(),
  };
};

export const disconnect = async () => {
  return {
    json: await client.json.disconnect(),
    search: await client.search.disconnect(),
  };
};
