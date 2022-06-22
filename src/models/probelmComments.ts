import {
  Model,
  Column,
  CreatedAt,
  UpdatedAt,
  Table,
  PrimaryKey,
  AutoIncrement,
  Unique,
  Default,
  HasMany,
  HasOne,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Resident, ProblemImage, Problem, User } from "./";

@Table({
  tableName: "problem_comments",
  freezeTableName: true,
  underscored: true,
  timestamps: true,
  charset: "utf8",
  collate: "utf8_general_ci",
  updatedAt: false,
})
export default class ProblemComment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @ForeignKey(() => Problem)
  @Column
  problem_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column
  content: string;

  @CreatedAt
  created_at: Date;

  @BelongsTo(() => Problem)
  problem: Problem;
}
