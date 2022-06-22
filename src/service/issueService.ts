import sequelize, { Model, Op } from "sequelize";
import _ from "lodash";
import {
  Home,
  Issue,
  IssueComment,
  IssueImage,
  Resident,
  User,
} from "../models";
import dayjs from "dayjs";

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
    async getIssuesByDate(data: {
      userId: number;
      isClient: boolean;
      date: string;
    }) {
      const { userId, isClient, date } = data;
      if (isClient) {
        const resident = await Resident.findOne({
          where: { user_id: userId },
          attributes: ["id"],
        });
        const issues = await Issue.findAll({
          where: {
            created_at: {
              [Op.gte]: date,
              [Op.lt]: dayjs(date).add(1, "day").format("YYYY-MM-DD"),
            },
            resident_id: resident.id,
          },
        });
        return issues;
      } else {
        const home = await Home.findOne({
          where: { host_id: userId },
          include: [
            {
              model: Resident,
            },
          ],
        });
        const residentIds = home.residents.map((o) => o.id);
        const issues = await Issue.findAll({
          where: {
            created_at: {
              [Op.gte]: date,
              [Op.lt]: dayjs(date).add(1, "day").format("YYYY-MM-DD"),
            },
            resident_id: {
              [Op.in]: residentIds,
            },
          },
          include: [
            {
              model: Resident,
              attributes: ["room_number"],
            },
          ],
        });
        return issues;
      }
    },
  };
});
