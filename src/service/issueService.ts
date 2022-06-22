import sequelize, { Op } from "sequelize";
import _ from "lodash";
import {
  Home,
  Issue,
  IssueComment,
  IssueImage,
  Resident,
  User,
} from "../models";

/**
 * @이슈_올리기
 */
export const getIssueService = _.memoize(() => {
  return {
    async createIssue(data: {
      residentId: number;
      title: string;
      category: string;
      content: string;
    }) {
      const { residentId, content, title, category } = data;
      const issue = await Issue.create({
        resident_id: residentId,
        content,
        category,
        title,
      });
      return issue.id;
    },
    async createIssueImgs(data: { issueId: number; imgs: string[] }) {
      const { issueId, imgs } = data;
      await Promise.all(
        imgs.map(async (img) => {
          if (img)
            await IssueImage.create({
              issue_id: issueId,
              img,
            });
        })
      );
    },
    async getIssueById(issueId: number) {
      const issue = await Issue.findOne({
        where: { id: issueId },
        include: [
          {
            model: Resident,
            attributes: ["room_number"],
            include: [
              {
                model: Home,
                attributes: ["name", "host_id"],
              },
            ],
          },
          {
            model: IssueComment,
            order: [["created_at", "ASC"]],
            attributes: ["id", "user_id", "content", "created_at"],
          },
        ],
      });

      return issue;
    },
  };
});
