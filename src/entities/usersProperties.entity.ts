import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Properties } from "./properties.entity";
import { User } from "./user.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("users_properties")
export class UsersProperties {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  hour: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Properties)
  properties: Properties;

  constructor(){
    if(!this.id){
      this.id = uuidv4()
    }
  }
}
