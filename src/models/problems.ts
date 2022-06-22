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
import { Resident, ProblemImage, ProblemComment } from "./";

@Table({
  tableName: "problems",
  freezeTableName: true,
  underscored: true,
  timestamps: true,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export default class Problem extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @ForeignKey(() => Resident)
  @Column
  resident_id: number;

  @Column
  content: string;

  @CreatedAt
  created_at: Date;

  @Default(null)
  @Column
  is_completed: boolean;

  @BelongsTo(() => Resident)
  resident: Resident;

  @HasMany(() => ProblemImage)
  images: ProblemImage[];

  @HasMany(() => ProblemComment)
  comments: ProblemComment[];
}
