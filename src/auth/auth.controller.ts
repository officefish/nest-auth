import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
//import { RefreshTokenDto } from './dto/refreshToken.dto';

import {
    ApiCreatedResponse,
    ApiResponse,
    ApiBody,
    ApiTags,
  } from '@nestjs/swagger'
import { SignInDto, SignUpDto, RefreshTokenDto, AuthResponseDto } from './auth.schema';
import { SIGN_UP_INVALID_DESC, AUTH_RESPONSE_DESC } from './auth.constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiBody({type: SignUpDto})
    @ApiResponse({
        status: 201,
        type: AuthResponseDto,
        description: AUTH_RESPONSE_DESC,
      })
      @ApiResponse({
        status: 400,
        description: SIGN_UP_INVALID_DESC,
      })
    @Post('register')
    async register(@Body() signUpDto: SignUpDto) {
        const input = {
          email: signUpDto.email,
          password: signUpDto.password,
          name: signUpDto.name
        }
        return this.authService.register(input);
    }

    @ApiBody({type: SignInDto})
    @ApiResponse({
        status: 200,
        type: AuthResponseDto,
        description: AUTH_RESPONSE_DESC,
      })
      @ApiResponse({
        status: 400,
        description: SIGN_UP_INVALID_DESC,
      })
    @Post('login')
    async login(@Body() signInDto: SignInDto) {
        const where = {
          email: signInDto.email
        }
        const password = signInDto.password
        return this.authService.login(where, password);
    }

    @ApiBody({type: RefreshTokenDto})
    @ApiResponse({
        status: 200,
        type: AuthResponseDto,
        description: AUTH_RESPONSE_DESC,
      })
      @ApiResponse({
        status: 400,
        description: SIGN_UP_INVALID_DESC,
      })
    @Post('login/access-token')
    async getNewTokens(@Body() refreshTokenDto: RefreshTokenDto) {
        const refreshToken = refreshTokenDto.refreshToken
        return this.authService.getNewTokens(refreshToken);
    }

}
