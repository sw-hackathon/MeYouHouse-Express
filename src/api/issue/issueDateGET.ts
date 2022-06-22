import { Request, Response } from "express";
import { success, fail } from "../../library/response";
import { sc, rm } from "../../constants";
import { getIssueService } from "../../service/issueService";
import dayjs from "dayjs";

/**
 * @route GET /issue/date?year=@&month=@
 * @desc 이슈 존재하는 날짜 조회
 *
 */
module.exports = async (req: Request, res: Response) => {
  let userId = 1;
  const reqData = req.body;
  const year = req.query.year as string;
  const month = req.query.month as string;
  let isClient = true;
  if (req.headers.authorization == "host") {
    userId = 2;
    isClient = false;
  }

  try {
    const issues = await getIssueService().getIssuesByYearAndMonth({
      userId,
      isClient,
      year: Number(year),
      month: Number(month),
    });

    let dates = [];
    const dateSet = new Set();
    if (issues) {
      issues.map((issue) => {
        const date = dayjs(issue.created_at).format("DD");
        dateSet.add(Number(date));
      });
      dates = Array.from(dateSet).sort();
    }

    return res.status(sc.OK).send(success(sc.OK, rm.GET_ISSUE_DAYS, { dates }));
  } catch (error) {
    console.log(error);
    res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};
