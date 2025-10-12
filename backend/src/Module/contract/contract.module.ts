import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractController } from 'src/Controllers/Contrats/contract.controller';
import { Contract } from 'src/Entities/Contracts/contract.entity';
import { ContractRepository } from 'src/Repositories/Contracts/contract.repository';
import { ContractService } from 'src/Services/Contrats/contract/contract.service';

@Module({
    imports: [TypeOrmModule.forFeature([Contract])],
    controllers: [ContractController],
    providers: [ContractService, ContractRepository],
  })
export class ContractModule {}
