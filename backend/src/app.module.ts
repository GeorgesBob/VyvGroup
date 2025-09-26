import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entities/User/user.entity';
import { Contract } from './Entities/Contracts/contract.entity';
import { UserController } from './Controllers/User/user.controller';
import { UsersService } from './Services/User/user.service';
import { UserModule } from './Module/user/user.module';
import { ContractModule } from './Module/contract/contract.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.dev.env',
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Contract],
    synchronize: true,
    autoLoadEntities: true,
  }),
  UserModule,
  ContractModule,

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
