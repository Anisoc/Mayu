import client from "@redis";
import expect from "expect";

const indexInit = async (index, name, as) => {
  return await client.search.info(index).catch(async () => {
    await client.search
      .create(index, "JSON", [
        {
          name: name,
          type: "TEXT",
          as: as,
        },
      ])
      .catch(async (err) => {
        console.log(err);
      });
  });
};
export const indexsInit = async () => {
  await indexInit("token-idx", "$[*]", "tokens");
  await indexInit("user-idx", "$.[*]", "users");
  await indexInit("post-idx", "$.[*]", "posts");
};
