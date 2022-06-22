import { Request, Response } from "express";
import { success, fail } from "../../library/response";
import { sc, rm } from "../../constants";
import { getIssueService } from "../../service/issueService";
import dayjs from "dayjs";

/**
 * @route GET /issue?date=@
 * @desc 이슈(불편사항) 특정 날짜로 조회
 *
 */
module.exports = async (req: Request, res: Response) => {
  let userId = 1;
  const reqData = req.body;
  const date = req.query.date as string;
  let isClient = true;
  if (req.headers.authorization == "host") {
    userId = 2;
    isClient = false;
  }

  try {
    const issues = await getIssueService().getIssuesByDate({
      userId,
      isClient,
      date,
    });
    const uncompleted_issues = [];
    const completed_issues = [];

    if (isClient) {
      issues.map((issue) => {
        const data = {
          id: issue.id,
          category: issue.category,
          title: issue.title,
        };
        if (issue.is_completed) completed_issues.push(data);
        else uncompleted_issues.push(data);
      });
    } else {
      issues.map((issue) => {
        const data = {
          id: issue.id,
          room_number: issue.resident.room_number,
          category: issue.category,
          title: issue.title,
        };

        if (issue.is_completed) completed_issues.push(data);
        else uncompleted_issues.push(data);
      });
    }
    const resData = {
      is_client: isClient,
      uncompleted_issues,
      completed_issues,
    };

    return res
      .status(sc.OK)
      .send(success(sc.OK, rm.GET_ISSUE_DETAIL_SUCCESS, resData));
  } catch (error) {
    console.log(error);
    res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};
