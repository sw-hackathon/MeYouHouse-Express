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
import { Resident, IssueImage, Issue, User } from ".";

@Table({
  tableName: "issue_comments",
  freezeTableName: true,
  underscored: true,
  timestamps: true,
  charset: "utf8",
  collate: "utf8_general_ci",
  updatedAt: false,
})
export default class issueComment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @ForeignKey(() => Issue)
  @Column
  issue_id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column
  content: string;

  @CreatedAt
  created_at: Date;

  @BelongsTo(() => Issue)
  issue: Issue;
}
