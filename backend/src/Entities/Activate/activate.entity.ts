import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../User/user.entity";

@Entity()
export class Activate {
    @PrimaryGeneratedColumn()
    idActivate

    @Column()
    codeVerif:string

    @Column({type: 'timestamptz'})
    expire:Date

    @Column({ nullable: true })
    userId: number;

    @OneToOne(() => User, (user) => user.activate, { cascade: true })
    @JoinColumn({name: 'userId'})
    user: User;
}