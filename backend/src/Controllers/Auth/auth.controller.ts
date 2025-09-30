import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from 'src/Decorator/public/public.decorator';
import { SignInDto } from 'src/Dtos/AuthDto/sign-in.dtos';
import { User } from 'src/Entities/User/user.entity';
import { RolesGuard } from 'src/Guards/roles/roles.guard';
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

    @Public()
    @Post('get-back-code')
    getBackCode(@Body() body) {
        return this.authService.getBackCodeVerif(body.email);
    }

    @UseGuards(RolesGuard)
    @Post('logout')
    async signOut(@Req() req) {
        await this.authService.signOut(req.user.sub);
    }
}
