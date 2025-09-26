import {Entity,Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm'
import { User } from '../User/user.entity'
import { GarantieType } from './garanties'

@Entity()
export class Contract {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    typeContrat:string

    @Column()
    dateDebut:Date
    
    @Column()
    dateFin:Date

    @Column()
    garantie:GarantieType

    @Column()
    prixMensuel:string

    @ManyToOne(() => User, (user) => user.contracts)
    user: User


}