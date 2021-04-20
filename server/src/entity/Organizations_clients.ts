import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn } from "typeorm";
import { User } from "./User";
import { Organization } from "./Organization";
import { Client } from "./Client";

@Entity()
export class Organizations_clients {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  clientId: number;

  @PrimaryColumn()
  organizationId: number;

  @ManyToOne(() => Organization, (organization) => organization.Organizations_clients, {
    onDelete: "CASCADE",
    cascade: true,
  })
  @JoinColumn({ name: "organizationId" })
  organization: Organization;

  @ManyToOne(() => Client, (client) => client.Organizations_clients, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "clientId" })
  client: Client;
}
