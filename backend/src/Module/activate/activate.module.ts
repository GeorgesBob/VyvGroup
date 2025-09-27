import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivateController } from 'src/Controllers/activate/activate.controller';
import { Activate } from 'src/Entities/Activate/activate.entity';
import { ActivateRepository } from 'src/Repositories/Activate/activate.repository';
import { ActivateService } from 'src/Services/Activate/activate.service';
import { EmailService } from 'src/Services/email/email.service';

@Module({
    imports:[TypeOrmModule.forFeature([Activate])],
  controllers: [ActivateController],  
  providers: [ActivateService,ActivateRepository, EmailService],
  exports: [ActivateService,ActivateRepository],
})
export class ActivateModule {}
