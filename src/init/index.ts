import { postsInit } from "@init/posts";
import { tokensInit } from "@init/tokens";
import { usersInit } from "@init/users";
import { emailsInit } from "@init/emails";

export const init = async () => {
  tokensInit();
  postsInit();
  emailsInit();
  usersInit();
};
