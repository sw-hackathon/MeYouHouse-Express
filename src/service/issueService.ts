import sequelize, { Op } from "sequelize";
import _ from "lodash";
import { Issue, IssueImage } from "../models";

/**
 * @이슈_올리기
 */
export const getIssueService = _.memoize(() => {
  return {
    async createIssue(data: { residentId: number; content: string }) {
      const { residentId, content } = data;
      const issue = await Issue.create({
        resident_id: residentId,
        content,
      });
      return issue.id;
    },
    async createIssueImgs(data: { issueId: number; imgs: string[] }) {
      const { issueId, imgs } = data;
      Promise.all(
        imgs.map(async (img) => {
          if (img)
            await IssueImage.create({
              issue_id: issueId,
              img,
            });
        })
      );
    },
  };
});
