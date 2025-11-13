import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const users = request.user;
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler()); 
    console.log('👤 Usuario autenticado:', users);
    console.log('🎭 Roles requeridos:', requiredRoles);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) return false;

    return requiredRoles.includes(user.role);
  }
}
