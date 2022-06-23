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
import { User, Resident } from "./";

@Table({
  tableName: "homes",
  freezeTableName: true,
  underscored: true,
  timestamps: false,
  charset: "utf8",
  collate: "utf8_general_ci",
  updatedAt: false,
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
  code: string;

  @BelongsTo(() => User)
  host: User;

  @HasMany(() => Resident)
  residents: Resident[];
}
