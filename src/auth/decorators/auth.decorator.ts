import { UseGuards, applyDecorators } from '@nestjs/common';
import { TypeRole } from '../auth.interface';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { OnlyOwnerGuard } from '../guards/owner.guard';

export const Auth = (role: TypeRole='OWNER') =>
  applyDecorators(
    role === 'OWNER'
      ? UseGuards(JwtAuthGuard, OnlyOwnerGuard)
      : UseGuards(JwtAuthGuard),
  );
