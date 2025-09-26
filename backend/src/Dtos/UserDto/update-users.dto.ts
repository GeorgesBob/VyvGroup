import { StatusType } from "src/Entities/User/status";

export interface UpdateUsersDto {
    firstName: string,
    lastName: string,
    birthDate: Date,
    email: string,
    password:string,
    phoneNumber:string,
    statut:StatusType
}