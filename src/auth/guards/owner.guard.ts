import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export class OnlyOwnerGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // const id = request.params.id;
    const user = request.user;
    if (user.role === 'OWNER') {
      return true;
    } else {
      throw new ForbiddenException('Only owner can access this resource');
    }
  }
}
