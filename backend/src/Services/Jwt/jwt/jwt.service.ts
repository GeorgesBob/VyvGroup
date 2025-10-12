import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Jwt } from 'src/Entities/Jwt/jwt.entity';
import { JwtRepository } from 'src/Repositories/Jwt/jwt.repository';
import { UsersService } from 'src/Services/User/user.service';
@Injectable()
export class JwtServices {
    constructor (private jwtService: JwtService, private jwtRepository: JwtRepository, usersService: UsersService){
    }
    async generateToken(tokenInfo:any) : Promise<{ accessToken:string, refreshToken:string }>{

       const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
         tokenInfo,
          { secret: process.env.JWT_SECRET, expiresIn: '15m' },
        ),
        this.jwtService.signAsync(
            tokenInfo,
          { secret: process.env.JWT_SECRET, expiresIn: '7d' },
        ),
      ]);
  
      return { accessToken, refreshToken };
    }   

    async insert(jwt: Jwt) {
        try {
            return this.jwtRepository.insert(jwt)
        } catch (error:any) {
            console.log(error);
        }
    }

    async updateById(id:number,body:Jwt) {
        try {
            return this.jwtRepository.updateOne(id, body);
        } catch (err:any) {
            console.log(err);
        }
    }

    async destroy(userId:number) {

        try {
            return this.jwtRepository.destroy(userId);
        } catch (error:any) {
            console.log(error);
        }
    }
    
    async findOne(userId:number) : Promise<Jwt> {
        try {
            return this.jwtRepository.findOne({where:{userId:userId}})
        } catch(err:any) {
            console.log(err);
        }
    } 
}
