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
  BelongsTo,
} from "sequelize-typescript";
import Home from "./homes";
import ProblemComment from "./probelmComments";
import Problem from "./problems";
import Resident from "./residents";

@Table({
  tableName: "users",
  freezeTableName: true,
  underscored: true,
  timestamps: true,
  charset: "utf8",
  collate: "utf8_general_ci",
})
export default class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @Column
  is_client: boolean;

  @HasOne(() => Home)
  home: Home;

  @HasOne(() => Resident)
  resident: Resident;

  @HasMany(() => ProblemComment)
  problemComments: ProblemComment[];
}
