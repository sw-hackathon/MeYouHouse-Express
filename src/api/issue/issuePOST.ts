import { Request, Response } from "express";
import { success, fail } from "../../library/response";
import { sc, rm } from "../../constants";
import { getIssueService } from "../../service/issueService";

/**
 * @route POST /issue
 * @desc 이슈 추가
 *
 */
module.exports = async (req: Request, res: Response) => {
  const residentId = 1;
  const reqData = req.body;
  if (!reqData) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NULL_VALUE));
  }
  try {
    const { content } = reqData;

    let imgs;
    console.log((req as any).files.imgs);
    if ((req as any).files.imgs) {
      imgs = (req as any).files.imgs.map((img) => img.location);
    }
    console.log("imgs", imgs);
    const issueId = await getIssueService().createIssue({
      residentId,
      content,
    });

    if (issueId) {
      if (imgs) {
        await getIssueService().createIssueImgs({
          issueId,
          imgs,
        });
      }
      return res.status(sc.OK).send(success(sc.OK, rm.CREATE_ISSUE_SUCCESS));
    }
  } catch (error) {
    console.log(error);
    res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};
