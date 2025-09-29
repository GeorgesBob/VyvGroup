import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/Constants/constants';
import { AuthController } from 'src/Controllers/Auth/auth.controller';
import { Activate } from 'src/Entities/Activate/activate.entity';
import { ActivateRepository } from 'src/Repositories/Activate/activate.repository';
import { ActivateService } from 'src/Services/Activate/activate.service';
import { AuthService } from 'src/Services/Auth/auth.service';
import { EmailService } from 'src/Services/email/email.service';
import { UserModule } from '../user/user.module';
import { JwtServices } from 'src/Services/Jwt/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Activate]), UserModule, 
  ConfigModule.forRoot({
    envFilePath: '.dev.env',
  }),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60000' },
  })],
  controllers: [AuthController],
  providers: [AuthService, ActivateService, ActivateRepository,EmailService, JwtServices],
})

export class AuthModule {}
