import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "./users";
import Home from "./homes";
import Resident from "./residents";
import Problem from "./problems";
import ProblemImage from "./problemImages";
import ProblemComment from "./probelmComments";
import Review from "./reviews";

const db: any = {};

dotenv.config();

export const sequelize = new Sequelize(
  // config.development.database,
  // config.development.username,
  // config.development.password,
  {
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_DBNAME,
    dialect: "postgres",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: false,
    timezone: "+09:00",
  }
);

sequelize.addModels([
  User,
  Home,
  Resident,
  Problem,
  ProblemImage,
  ProblemComment,
  Review,
]);

export { User, Home, Resident, Problem, ProblemImage, ProblemComment, Review };

export default sequelize;
