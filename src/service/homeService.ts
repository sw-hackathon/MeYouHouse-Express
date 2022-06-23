import _ from "lodash";
import { Home } from "../models";

export const getHomeService = _.memoize(() => {
  return {
    async createHome(data: { userId: number; name: string }) {
      const { userId, name } = data;
      const code = Math.round(Math.random() * 1000000).toString();
      const home = await Home.create({
        name,
        host_id: userId,
        code,
      });
      return home;
    },
    async getHomeByCode(code: string) {
      const home = await Home.findOne({ where: { code } });
      return home;
    },
  };
});
