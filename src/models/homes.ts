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
import { User } from "./";

@Table({
  tableName: "homes",
  freezeTableName: true,
  underscored: true,
  timestamps: true,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export default class Home extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  host_id: number;

  @Column
  name: string;

  @Column
  code: number;

  @BelongsTo(() => User)
  host: User;
}
