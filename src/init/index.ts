import { postsInit } from "@init/posts";
import { tokensInit } from "@init/tokens";
import { usersInit } from "@init/users";
import { emailsInit } from "@init/emails";
import { indexsInit } from "@init/indexes";
export const init = async () => {
  tokensInit();
  postsInit();
  emailsInit();
  usersInit();
  await indexsInit();
};
