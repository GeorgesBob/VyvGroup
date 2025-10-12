import { IsNotEmpty, IsEmail, IsDate, IsEnum, IsString } from 'class-validator';
import { StatusType } from 'src/Entities/User/status';

export class CreateUsersDto {
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
