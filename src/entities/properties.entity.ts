import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Addresses } from "./addresses.entity";
import { Categories } from "./category.entity";
import { UsersProperties } from "./usersProperties.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("properties")
export class Properties {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({default: false})
  sold: boolean;

  @Column()
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne((type) => Addresses, {
    eager: true,
    cascade: true
  })
  @JoinColumn()
  address: Addresses;

  @OneToMany(() => UsersProperties, (schedules) => schedules.properties)
  schedules: UsersProperties[];

  @ManyToOne(() => Categories)
  category: Categories;

  constructor(){
    if(!this.id){
      this.id = uuidv4()
    }
  }
}
