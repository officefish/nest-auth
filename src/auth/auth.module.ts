import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from 'src/config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy ],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [
        ConfigModule
      ],
      inject: [ConfigService],
      useFactory: getJWTConfig
    })
  ],
  exports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [
        ConfigModule
      ],
      inject: [ConfigService],
      useFactory: getJWTConfig
    })
  ]
})
export class AuthModule {}
