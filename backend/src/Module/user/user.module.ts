import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/Controllers/User/user.controller';
import { User } from 'src/Entities/User/user.entity';
import { UserRepository } from 'src/Repositories/Users/user.repository';
import { UsersService } from 'src/Services/User/user.service';

@Global()
@Module({
    imports:[TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UsersService, UserRepository],
    exports: [UsersService, UserRepository],
  })
export class UserModule {}
