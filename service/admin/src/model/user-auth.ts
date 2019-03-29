import User from "./user";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("user_authority")
export default class UserAuth {
  @PrimaryGeneratedColumn({
    type: "tinyint",
    unsigned: !0,
    comment: `primary`
  })
  id: number;

  @Column({
    name: "zh_CN",
    type: "varchar",
    length: 20,
    unique: !0,
    comment: `chinese name`
  })
  "zh-CN": string;

  @Column({
    name: "en_US",
    type: "varchar",
    length: 20,
    unique: !0,
    comment: `english name`
  })
  "en-US": string;

  @Column({
    type: "varchar",
    length: 3,
    default: "1",
    comment: `/^[0-9]{1,3}$/`
  })
  power: string;

  @Column({
    type: "tinyint",
    unsigned: !0,
    default: 0
  })
  sort: number;

  @OneToMany(type => User, user => user.auth)
  users: User[];
}
