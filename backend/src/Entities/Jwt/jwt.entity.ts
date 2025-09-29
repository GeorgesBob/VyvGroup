import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../User/user.entity";

@Entity()
export class Jwt {
    @PrimaryGeneratedColumn()
    idJwt:number

    @Column()
    token:string

    @Column()
    refreshToken:string

    @Column()
    expire:Date

    @Column()
    userId:number

    @OneToOne(() => User, (user) => user.jwt)
    @JoinColumn({name: 'userId'})
    user: User;
}