import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jwt } from 'src/Entities/Jwt/jwt.entity';
import { JwtRepository } from 'src/Repositories/Jwt/jwt.repository';
import { JwtServices } from 'src/Services/Jwt/jwt/jwt.service';

@Module({
    imports: [TypeOrmModule.forFeature([Jwt])],
    providers: [JwtServices, JwtService,JwtRepository],
    exports: [JwtServices, JwtRepository]
})
export class JwtModule {}
