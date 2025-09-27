import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, } from 'typeorm';
import { Contract } from '../Contracts/contract.entity';
import { StatusType } from './status';
import { Jwt } from '../Jwt/jwt.entity';
import { Activate } from '../Activate/activate.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    idUser:number

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column({
        nullable:true
    })
    active:boolean

    @Column()
    birthDate:Date 
    
    @Column({unique:true})
    email: string

    @Column()
    password:string

    @Column()
    phoneNumber:string

    @Column()
    statut:StatusType

    @Column({ nullable: true })
    jwtId: number;
    
    @OneToOne(() => Jwt, (jwt) => jwt.user,)
    @JoinColumn({ name: 'jwtId' })
    jwt?: Jwt;
    
    @Column({ nullable: true })
    activateId: number;
    
    @OneToOne(() => Activate, (activate) => activate.user)
    @JoinColumn({ name: 'activateId' })
    activate?: Activate;

    @OneToMany(() => Contract, contract => contract.user)
    contracts: [];


}