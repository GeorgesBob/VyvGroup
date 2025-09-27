import { InjectRepository } from "@nestjs/typeorm";
import { Activate } from "src/Entities/Activate/activate.entity";
import { Repository } from "typeorm";

export class ActivateRepository extends Repository<Activate>{

    constructor(
        @InjectRepository(Activate)
        private activateRepository: Repository<Activate>,
      ) {
        super(
          activateRepository.target,
          activateRepository.manager,
          activateRepository.queryRunner,
        );
      }

      public async findAll(): Promise<Activate[]> {
        return this.find();
      }

      public async findById(id: number): Promise<Activate | null> {
        return this.findOneBy({ idActivate: id });
      }

      public async findByCodeVerif(code: string): Promise<Activate | null> {
        return this.findOneBy({ codeVerif: code });
        
      }
    
      public async store(activate: Activate): Promise<Activate> {
        const newUser = this.create(activate);
        return this.save(newUser);
      }
    
      public async updateOne(
        id: number,
        updateActivate: Activate,
      ): Promise<Activate | undefined> {
        const activate = await this.findById(id);
        if (!activate) return undefined;
        Object.assign(activate, updateActivate);
        return this.save(activate);
      }
    
      public async destroy(id: number): Promise<void> {
        await this.delete(id);
      }

      



}