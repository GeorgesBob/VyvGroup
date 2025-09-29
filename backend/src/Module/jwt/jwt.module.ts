import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jwt } from 'src/Entities/Jwt/jwt.entity';
import { JwtRepository } from 'src/Repositories/Jwt/jwt.repository';
import { JwtServices } from 'src/Services/Jwt/jwt/jwt.service';

@Module({
    imports: [TypeOrmModule.forFeature([Jwt])],
    providers: [JwtServices],
    exports: [JwtServices]
})
export class JwtModule {}
