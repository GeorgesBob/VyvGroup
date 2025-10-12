import { InjectRepository } from "@nestjs/typeorm";
import { Jwt } from "src/Entities/Jwt/jwt.entity";
import { Repository } from "typeorm";

export class JwtRepository extends Repository<Jwt>{

    constructor(
        @InjectRepository(Jwt)
        private jwtRepository: Repository<Jwt>,
      ) {
        super(
            jwtRepository.target,
            jwtRepository.manager,
            jwtRepository.queryRunner,
        );
      }

      public async findAll(): Promise<Jwt[]> {
        return this.jwtRepository.find();
      }

      public async findById(id: number): Promise<Jwt | null> {
        return this.jwtRepository.findOneBy({ idJwt: id });
      }
    
      public async store(jwt): Promise<Jwt[]> {
        const newJwt = this.jwtRepository.create(jwt);
        return this.jwtRepository.save(newJwt);
      }
    
      public async destroy(id: number): Promise<void> {
        await this.jwtRepository.delete({userId: id});
      }

      public async updateOne(
        id: number,
        updateJwt: Jwt,
      ): Promise<Jwt | undefined> {
        const jwt = await this.findById(id);
        if (!jwt) return undefined;
        Object.assign(jwt, updateJwt);
        return this.save(jwt);
      }
    }