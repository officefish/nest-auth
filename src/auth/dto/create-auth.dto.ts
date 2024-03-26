import {
    IsStrongPassword,
    IsEmail,
    IsString,
    MinLength,
    IsNotEmpty,
  } from 'class-validator';

export class CreateAuthDto {
    @MinLength(2)
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsStrongPassword()
    @IsNotEmpty()
    password: string;
}
