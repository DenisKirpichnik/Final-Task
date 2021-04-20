import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Project } from "./Project";
import { Organization } from "./Organization";
import { Organizations_clients } from "./Organizations_clients";
@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  email: string;

  @Column({
    type: "jsonb",
  })
  details: object;
  //Old way
  /*
  @ManyToMany(() => Organization, (organization) => organization.clients, {
    //cascade: true,
    //onDelete: "CASCADE",
  })
  organizations: Organization[];
  */
  @OneToMany(() => Project, (project) => project.client, {
    //cascade: true,
    onDelete: "CASCADE",
  })
  projects: Project[];

  // UNNECESSARY TABLE
  @OneToMany(() => Organizations_clients, (oc) => oc.client, {
    //cascade: true
  })
  public Organizations_clients!: Organizations_clients[];
}

/*
@ManyToMany(() => Organization, (organization) => organization.clients, {
    //cascade: true,
    onDelete: "CASCADE",
  })
  @JoinTable({ name: "client_organizations" })
  organizations: Organization[];
  */
