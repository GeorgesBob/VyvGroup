import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class JwtServices {
    constructor (private jwtService: JwtService){
    }
    async generateToken(tokenInfo:any) : Promise<string>{
       const jwt =  await this.jwtService.signAsync(tokenInfo);
        return jwt;
    }   

  

}
