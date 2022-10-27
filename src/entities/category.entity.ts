import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Properties } from "./properties.entity";
import { v4 as uuidv4 } from "uuid";

@Entity("categories")
export class Categories {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @OneToMany(() => Properties, (category) => category.category)
  category: Properties[];

  constructor(){
    if(!this.id){
      this.id = uuidv4()
    }
  }
}
