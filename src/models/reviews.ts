import { float } from "aws-sdk/clients/lightsail";
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
  tableName: "reviews",
  freezeTableName: true,
  underscored: true,
  timestamps: false,
  charset: "utf8",
  collate: "utf8_general_ci",
  updatedAt: false,
})
export default class Review extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @ForeignKey(() => Resident)
  @Column
  resident_id: number;

  @Column
  review: number;

  @Column
  content: string;

  @BelongsTo(() => Resident)
  resident: Resident;
}
