import { Request, Response } from "express";
import { success, fail } from "../../library/response";
import { sc, rm } from "../../constants";
import { getIssueService } from "../../service/issueService";

/**
 * @route POST /issue/:issueId/comment
 * @desc 이슈 댓글 작성
 *
 */
module.exports = async (req: Request, res: Response) => {
  let userId = 1;
  const reqData = req.body;
  const { issueId } = req.params;
  let isClient = true;
  if (req.headers.authorization == "host") {
    userId = 2;
    isClient = false;
  }

  try {
    const { content } = reqData;

    const comment = await getIssueService().createIssueComment({
      issueId: Number(issueId),
      content,
      userId,
    });
    return res
      .status(sc.OK)
      .send(success(sc.OK, rm.CREATE_ISSUE_COMMENT_SUCCESS, { comment }));
  } catch (error) {
    console.log(error);
    res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};
