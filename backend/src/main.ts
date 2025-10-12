import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './Guards/roles/roles.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtServices } from './Services/Jwt/jwt/jwt.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalGuards(new RolesGuard(app.get(JwtService), app.get(JwtServices), app.get(Reflector)))
  await app.listen(3000);
}
bootstrap();
