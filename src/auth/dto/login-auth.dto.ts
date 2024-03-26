import {
    IsStrongPassword,
    IsEmail,
    IsString,
    MinLength,
    IsNotEmpty,
  } from 'class-validator';

export class LoginAuthDto {
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}