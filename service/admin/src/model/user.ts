import UserAuth from "./user-auth";
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity("user")
export default class User {
  @PrimaryColumn({
    type: "varchar",
    length: 36,
    comment: `primary`,
    select: !1
  })
  id: string;

  @Column({
    type: "varchar",
    length: 20,
    unique: !0,
    comment: `/^[a-zA-Z]\w{5,15}$/`
  })
  account: string;

  @Column({
    type: "varchar",
    length: 32,
    comment: `/^\S{6,20}$/`,
    select: !1
  })
  password: string;

  @Column({
    type: "varchar",
    length: 36,
    nullable: !0,
    comment: `password salt, uuid v4`,
    select: !1
  })
  salt: string;

  @Column({
    type: "varchar",
    length: 20,
    unique: !0,
    comment: `/^\S{2,12}$/`
  })
  nickname: string;

  @Column({
    type: "varchar",
    length: 50,
    unique: !0,
    nullable: !0
  })
  email: string;

  @Column({
    type: "varchar",
    length: 20,
    unique: !0,
    nullable: !0
  })
  phone: string;

  @Column({
    type: "varchar",
    length: 36,
    nullable: !0,
    comment: `User token, uuid v4`,
    select: !1
  })
  token: string;

  @Column({
    name: "created_at",
    type: "bigint",
    nullable: !0,
    comment: `Create time`,
    select: !1
  })
  createdAt: number;

  @Column({
    name: "login_at",
    type: "bigint",
    nullable: !0,
    comment: `Last login time`,
    select: !1
  })
  loginAt: number;

  @Column({
    name: "deleted_at",
    type: "bigint",
    nullable: !0,
    comment: `Nuked time`,
    select: !1
  })
  deletedAt: number;

  @ManyToOne(type => UserAuth, auth => auth.users)
  @JoinColumn({
    name: "auth_id",
    referencedColumnName: "id"
  })
  auth: UserAuth;
}
