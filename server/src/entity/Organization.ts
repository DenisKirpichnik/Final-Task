import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Client } from "./Client";
import { Users_organization } from "./Users_organization";
import { Organizations_clients } from "./Organizations_clients";
@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  logo: string;

  @Column({
    type: "jsonb",
    nullable: true,
  })
  details: object[];

  @OneToMany(() => Users_organization, (uo) => uo.organization, {
    //cascade: true
    onDelete: "CASCADE",
  })
  public Users_organizations!: Users_organization[];

  // client connection
  //Old way
  /*
  @ManyToMany(() => Client, (client) => client.organizations, {
    //cascade: true,
    onDelete: "CASCADE",
  })
  @JoinTable({ name: "organizations_clients" })
  clients: Client[];
  */

  // UNNECESSARY TABLE
  @OneToMany(() => Organizations_clients, (oc) => oc.organization, {
    //cascade: true
    onDelete: "CASCADE",
  })
  public Organizations_clients!: Organizations_clients[];
}
