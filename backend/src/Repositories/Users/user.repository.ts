import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Entities/User/user.entity";
import { Repository } from "typeorm/repository/Repository";
import {CreateUsersDto} from "../../Dtos/UserDto/create-users.dto"
import {UpdateUsersDto} from "../../Dtos/UserDto/update-users.dto"

export class UserRepository extends Repository<User>{

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
      ) {
        super(
          userRepository.target,
          userRepository.manager,
          userRepository.queryRunner,
        );
      }

      public async findAll(): Promise<User[]> {
        return this.userRepository.find();
      }

      public async findById(id: number): Promise<User | null> {
        return this.userRepository.findOneBy({ idUser: id });
      }
    
      public async store(user: CreateUsersDto): Promise<User> {
        const newUser = this.userRepository.create(user);
        return this.userRepository.save(newUser);
      }
    
      public async updateOne(
        id: number,
        updateUserDto: Partial<UpdateUsersDto>,
      ): Promise<User | undefined> {
        const user = await this.findById(id);
        if (!user) return undefined;
      
        // Prevent empty update
        if (!updateUserDto || Object.keys(updateUserDto).length === 0) {
          throw new Error("No fields provided for update");
        }
      
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
      }
    
      public async destroy(id: number): Promise<void> {
        await this.userRepository.delete(id);
      }

      



}