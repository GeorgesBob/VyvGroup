import { StatusType } from "src/Entities/User/status";
import { IsNotEmpty, IsEmail, IsDate, IsEnum, IsString } from 'class-validator';
export class UpdateUsersDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    @IsNotEmpty()
    @IsDate()
    birthDate: Date;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  
    @IsNotEmpty()
    @IsString()
    phoneNumber: string;
  
    @IsNotEmpty()
    statut: StatusType;
  }