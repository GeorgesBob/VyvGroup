import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/Controllers/Auth/auth.controller';
import { Activate } from 'src/Entities/Activate/activate.entity';
import { ActivateRepository } from 'src/Repositories/Activate/activate.repository';
import { ActivateService } from 'src/Services/Activate/activate.service';
import { AuthService } from 'src/Services/Auth/auth.service';
import { EmailService } from 'src/Services/email/email.service';


@Module({
  imports: [TypeOrmModule.forFeature([Activate])],
  controllers: [AuthController],
  providers: [AuthService, ActivateService, ActivateRepository,EmailService],
})
export class AuthModule {}
