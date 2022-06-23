import _ from "lodash";
import { Home, User } from "../models";

export const getAuthService = _.memoize(() => {
  return {
    async createHost() {
      const user = await User.create({
        isClient: false,
      });

      return user;
    },
  };
});
