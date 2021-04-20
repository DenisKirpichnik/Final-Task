import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany,JoinTable, Timestamp} from "typeorm";
import {Organization} from "./Organization"
import {Users_organization} from "./Users_organization"
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    confirmed: boolean;

    @Column({nullable: true})
    uuid: string;
    
    @Column({ type: 'timestamp without time zone', default: 'NOW()'  })
    created_At: Date;

    @OneToMany(() => Users_organization, uo => uo.user ,{
        //cascade: true
      })
    public Users_organizations!: Users_organization[];
    
}


{/*
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    confirmed: boolean;

    @Column({nullable: true})
    uuid: string;
    
    @Column({ type: 'timestamp without time zone', default: 'NOW()'  })
    created_At: Date;

    @OneToMany(() => Users_organization, users_organization => users_organization.user,{
        cascade: true
      })
    public Users_organizations!: Users_organization[];
}
 */}