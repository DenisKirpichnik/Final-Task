import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, PrimaryColumn, JoinColumn } from "typeorm";
import { User } from "./User";
import { Organization } from "./Organization";

@Entity()
export class Users_organization {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  organizationId: number;

  @Column({
    nullable: true,
  })
  role: string | null;

  @ManyToOne(() => User, (user) => user.Users_organizations, {
    cascade: true,
    primary: true,
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Organization, (organization) => organization.Users_organizations, {
    //cascade: true,
    // primary:true,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "organizationId" })
  organization: Organization;
}

{
  /*@Entity()
export class Users_organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    role: string;

    @ManyToOne(() => User, user => user.Users_organizations,{
        cascade: true
      })
      
    public user!: User;
    
    @ManyToOne(() => Organization, organization => organization.Users_organizations,{
        cascade: true
      })
    public organization!:  Organization;

    
} */
}
