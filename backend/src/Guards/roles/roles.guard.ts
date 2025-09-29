import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY, IS_USER_ACTIVATE_KEY, ROLES_KEY } from 'src/Constants/constants';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private jwtService: JwtService, private reflector: Reflector) {}
 async canActivate(
    context: ExecutionContext,
  ) : Promise<boolean> {

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }



    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    console.log("token : =>> ",token)
    
    if (!token) {
      throw new UnauthorizedException();
    }


    try {
      const payload = await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET});

      request['user'] = payload; // on stocke l’utilisateur dans la requête

      if (!requiredRoles || requiredRoles.length === 0) {
        return true; // pas de rôles requis → autorisé
      }

      const userRoles: string[] = payload.roles || [];

      const hasRole = requiredRoles.some((role) => userRoles.includes(role));

      if (!hasRole) {
        throw new ForbiddenException('You do not have the required role');
      }

    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

