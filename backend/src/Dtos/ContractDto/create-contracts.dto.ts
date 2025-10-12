import { IsNotEmpty, IsEmail, IsDate, IsEnum, IsString, IsNumber } from 'class-validator';
import { GarantieType } from 'src/Entities/Contracts/garanties';
import { StatusType } from 'src/Entities/User/status';
import { User } from 'src/Entities/User/user.entity';

export class CreateContractDto {

  @IsNotEmpty()
  @IsNumber()
  idContract:number

  @IsNotEmpty()
  @IsString()
  prixMensuel:string

  @IsNotEmpty()
  @IsString()
  typeContrat: string;

  @IsNotEmpty()
  @IsDate()
  dateDebut: Date;

  @IsNotEmpty()
  @IsDate()
  dateFin: Date;

  @IsNotEmpty()
  @IsString()
  garantie: GarantieType;

  @IsNotEmpty()
  user:User

}
