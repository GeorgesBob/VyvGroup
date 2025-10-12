import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/Controllers/Auth/auth.controller';
import { Activate } from 'src/Entities/Activate/activate.entity';
import { ActivateRepository } from 'src/Repositories/Activate/activate.repository';
import { ActivateService } from 'src/Services/Activate/activate.service';
import { AuthService } from 'src/Services/Auth/auth.service';
import { EmailService } from 'src/Services/email/email.service';
import { UserModule } from '../user/user.module';
import { JwtServices } from 'src/Services/Jwt/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { JwtRepository } from 'src/Repositories/Jwt/jwt.repository';
import { Jwt } from 'src/Entities/Jwt/jwt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activate, Jwt]), UserModule],
  controllers: [AuthController],
  providers: [AuthService, ActivateService, ActivateRepository,EmailService, JwtServices, JwtService, JwtRepository],
})

export class AuthModule {}
