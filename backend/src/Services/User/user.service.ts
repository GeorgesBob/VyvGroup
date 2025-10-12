import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './../../Repositories/Users/user.repository';
import { User } from './../../Entities/User/user.entity'

@Injectable()
export class UsersService {

  private logger = new Logger(UsersService.name);
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll();
      if (users?.length === 0) {
        throw new Error('No record found.');
      }
      return users;
    } catch (error) {
      this.logger.log(
        `UsersService:findAll : ${JSON.stringify(error.message)}`,
      );
    }
  }

  async create(user:User): Promise<User> {
    try {
      return this.userRepository.store(user);
    } catch (error) {
      this.logger.log(`UsersService:create: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async findById(id: number): Promise<User> {

    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new Error('User not found.');
      }
      return user;
    } catch (error) {
      this.logger.log(
        `UsersService:findById: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }
  }

  async findByEmail(email:string): Promise<User>{

    try {
      const user = await this.userRepository.findOne({where: {email:email}});
      if (!user) {
        throw new Error('User not found.');
      }
      return user;
    } catch (error) {
      this.logger.log(
        `UsersService:findByEmail: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }

  } 

  async findByFirstName(firstName:string): Promise<User[]>{
    try {
      const user = await this.userRepository.findBy({firstName:firstName});
      if (!user) {
        throw new Error('User not found.');
      }
      user
      return user;
    } catch (error) {
      this.logger.log(
        `UsersService:findByEmail: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }

  } 

  async findByLastName(lastName:string): Promise<User>{

    try {
      const user = await this.userRepository.findOne({where: {lastName:lastName}});
      if (!user) {
        throw new BadRequestException('User not found.');
      }
      return user;
    } catch (error) {
      this.logger.log(
        `UsersService:findByLastName: ${JSON.stringify(error.message)}`,
      );
      throw new Error(error.message);
    }

  } 

  async update(id: number, user: Partial<User>): Promise<User> {
    try {
      await this.findById(id);
      return await this.userRepository.updateOne(id, user);
    } catch (error) {
      this.logger.log(`UsersService:update: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }

  async delete(id: number) {
    try {
      return await this.userRepository.destroy(id);
    } catch (error) {
      this.logger.log(`UsersService:delete: ${JSON.stringify(error.message)}`);
      throw new Error(error.message);
    }
  }
}