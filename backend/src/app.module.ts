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
import { MailerModule } from '@nestjs-modules/mailer';
import { Jwt } from './Entities/Jwt/jwt.entity';
import { AuthModule } from './Module/auth/auth.module';
import { Activate } from './Entities/Activate/activate.entity';
import { ActivateModule } from './Module/activate/activate.module';
import { JwtModule } from './Module/jwt/jwt.module';
import { EmailModule } from './Module/email/email.module';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.dev.env',
    isGlobal: true,
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [User, Contract,Jwt, Activate],
    synchronize: true,
  }),
  MailerModule.forRoot({
    transport: {
      host: 'localhost',
      port: 1090,
      secure: false,
    },    
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    }
  }),
  UserModule,
  ContractModule,
  AuthModule,
  ActivateModule,
  JwtModule,
  EmailModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
