import {Entity, Column, PrimaryGeneratedColumn, OneToMany, } from 'typeorm';
import { Contract } from '../Contracts/contract.entity';
import { StatusType } from './status';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id

    @Column()
    firstName:string

    @Column()
    lastName:string

    @Column()
    birthDate:Date 
    
    @Column()
    email: string

    @Column()
    password:string

    @Column()
    phoneNumber:string

    @Column()
    statut:StatusType

    @OneToMany(type => Contract, contract => contract.user)
    contracts: [];


}