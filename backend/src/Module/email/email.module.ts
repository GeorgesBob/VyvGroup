import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activate } from 'src/Entities/Activate/activate.entity';
import { ActivateRepository } from 'src/Repositories/Activate/activate.repository';
import { EmailService } from 'src/Services/email/email.service';

@Module({
    imports: [TypeOrmModule.forFeature([Activate])],
    providers: [EmailService, ActivateRepository],
    exports: [EmailService, ActivateRepository]
})
export class EmailModule {}
