import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UsersProperties } from "./usersProperties.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("user")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ length: 60, unique: true })
  email: string;

  @Column({ length: 120 })
  @Exclude()
  password: string;

  @Column()
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UsersProperties, (schedules) => schedules.user)
  schedules: UsersProperties[];

  constructor(){
    if(!this.id){
      this.id = uuidv4()
    }
  }
}
