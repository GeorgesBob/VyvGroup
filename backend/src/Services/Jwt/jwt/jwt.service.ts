import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/Constants/constants';
@Injectable()
export class JwtServices {
    constructor (private jwtService: JwtService){
    }
    async generateToken(tokenInfo:any) : Promise<string>{
       const jwt =  await this.jwtService.signAsync(tokenInfo);
        return jwt;
    }   
    async verifyAsync(token) : Promise<any>{
       const payload = this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
    return payload;
    
    }
  

}
