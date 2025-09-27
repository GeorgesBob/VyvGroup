import { Body, Controller, Post, Req } from '@nestjs/common';
import { User } from 'src/Entities/User/user.entity';
import { AuthService } from 'src/Services/Auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){

    }
    @Post('register')
    create(@Body() user:User) {
        console.log(user)
        return this.authService.create(user); 
    }
}
