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
import { Problem } from "./";

@Table({
  tableName: "problem_images",
  freezeTableName: true,
  underscored: true,
  timestamps: false,
  charset: "utf8",
  collate: "utf8_general_ci",
  updatedAt: false,
})
export default class ProblemImage extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @ForeignKey(() => Problem)
  @Column
  problem_id: number;

  @Column
  img: string;

  @BelongsTo(() => Problem)
  problem: Problem;
}
