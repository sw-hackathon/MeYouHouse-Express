import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "./users";
import Home from "./homes";
import Resident from "./residents";
import Issue from "./issues";
import IssueImage from "./issueImages";
import IssueComment from "./issueComments";
import Review from "./reviews";

const db: any = {};

dotenv.config();

export const sequelize = new Sequelize({
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DBNAME,
  dialect: "mysql",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
  timezone: "+09:00",
});

sequelize.addModels([
  User,
  Home,
  Resident,
  Issue,
  IssueImage,
  IssueComment,
  Review,
]);

export { User, Home, Resident, Issue, IssueImage, IssueComment, Review };

export default sequelize;
