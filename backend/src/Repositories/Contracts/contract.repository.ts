import { InjectRepository } from "@nestjs/typeorm";
import { Contract } from "src/Entities/Contracts/contract.entity";
import { Repository } from "typeorm";

export class ContractRepository extends Repository<Contract>{

    constructor(
        @InjectRepository(Contract)
        private contractRepository: Repository<Contract>,
      ) {
        super(
          contractRepository.target,
          contractRepository.manager,
          contractRepository.queryRunner,
        );
      }

      public async findAll(): Promise<Contract[]> {
        return this.find();
      }

      public async findById(id: number): Promise<Contract | null> {
        return this.findOneBy({ idContract: id });
      }
    
      public async store(contract: Contract): Promise<Contract> {
        const newContract = this.create(contract);
        return this.save(newContract);
      }
    
      public async updateOne(
        id: number,
        updatecontract: Contract,
      ): Promise<Contract | undefined> {
        const contract = await this.findById(id);
        if (!contract) return undefined;
        Object.assign(contract, updatecontract);
        return this.save(contract);
      }
    
      public async destroy(id: number): Promise<void> {
        await this.delete(id);
      }

      



}