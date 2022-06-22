import { Request, Response } from "express";
import { success, fail } from "../../library/response";
import { sc, rm } from "../../constants";
import { getIssueService } from "../../service/issueService";
import dayjs from "dayjs";

/**
 * @route GET /issue/:issueId
 * @desc 특정 이슈(불편사항)조회
 *
 */
module.exports = async (req: Request, res: Response) => {
  let userId = 1;
  const reqData = req.body;
  const { issueId } = req.params;
  if (req.headers.authorization == "HOST") {
    userId = 2;
  }

  try {
    const issue = await getIssueService().getIssueById(Number(issueId));
    const comments = issue.comments.map((comment) => {
      const is_me = comment.user_id == userId ? true : false;
      const is_client =
        issue.resident.home.host_id == comment.user_id ? false : true;
      if (is_client) {
        return {
          id: comment.id,
          name: issue.resident.room_number,
          is_client,
          is_me,
          content: comment.content,
          created_at: dayjs(comment.created_at).format("MM/DD HH:mm"),
        };
      } else {
        return {
          id: comment.id,
          name: issue.resident.home.name,
          is_client,
          is_me,
          content: comment.content,
          created_at: dayjs(comment.created_at).format("MM/DD HH:mm"),
        };
      }
    });
    const resData = {
      id: issue.id,
      title: issue.title,
      content: issue.content,
      category: issue.category,
      room_number: issue.resident.room_number,
      is_completed: issue.is_completed,
      created_at: dayjs(issue.created_at).format("MM/DD HH:mm"),
      comments,
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
