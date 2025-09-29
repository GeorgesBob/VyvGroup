import { Body, Controller, Post, Req } from '@nestjs/common';
import { Public } from 'src/Decorator/public/public.decorator';
import { SignInDto } from 'src/Dtos/AuthDto/sign-in.dtos';
import { User } from 'src/Entities/User/user.entity';
import { AuthService } from 'src/Services/Auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){

    }
    @Public()
    @Post('register')
    create(@Body() user:User) {
        console.log(user)
        return this.authService.create(user); 
    }

    @Public()
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
       return this.authService.signIn(signInDto);
    }
}
