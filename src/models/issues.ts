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
import { Resident, IssueImage, IssueComment } from ".";

@Table({
  tableName: "issues",
  freezeTableName: true,
  underscored: true,
  timestamps: true,
  charset: "utf8",
  collate: "utf8_general_ci",
  updatedAt: false,
})
export default class Issue extends Model {
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

  @Default(false)
  @Column
  is_completed: boolean;

  @BelongsTo(() => Resident)
  resident: Resident;

  @HasMany(() => IssueImage)
  images: IssueImage[];

  @HasMany(() => IssueComment)
  comments: IssueComment[];
}
