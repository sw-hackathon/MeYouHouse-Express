import { Request, Response } from "express";
import { success, fail } from "../../library/response";
import { sc, rm } from "../../constants";
import { getIssueService } from "../../service/issueService";
import dayjs from "dayjs";
import { getHomeService } from "../../service/homeService";

/**
 * @route GET /auth/home/:code
 * @desc 코드로 집 정보 조회
 *
 */
module.exports = async (req: Request, res: Response) => {
  const { code } = req.params;

  try {
    const home = await getHomeService().getHomeByCode(code);

    return res
      .status(sc.OK)
      .send(success(sc.OK, rm.GET_HOME_BY_CODE_SUCCESS, home));
  } catch (error) {
    console.log(error);
    res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};
