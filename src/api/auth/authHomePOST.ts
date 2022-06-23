import { Request, Response } from "express";
import { success, fail } from "../../library/response";
import { sc, rm } from "../../constants";
import { getIssueService } from "../../service/issueService";
import dayjs from "dayjs";
import { getAuthService } from "../../service/authService";
import { getHomeService } from "../../service/homeService";

/**
 * @route POST /auth/home
 * @desc 집 등록
 */
module.exports = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const user = await getAuthService().createHost();

    const home = await getHomeService().createHome({ userId: user.id, name });

    return res
      .status(sc.OK)
      .send(success(sc.OK, rm.CREATE_HOME_SUCCESS, { user, home }));
  } catch (error) {
    console.log(error);
    res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};
