import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable } from "typeorm";
import { Client } from "./Client";
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @ManyToOne(() => Client, (client) => client.projects, {
    //cascade: true,
    onDelete: "CASCADE",
  })
  client: Client;
}
