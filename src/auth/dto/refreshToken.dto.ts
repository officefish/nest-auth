import { IsJWT, IsString } from "class-validator";

export class RefreshTokenDto {
    @IsJWT()
    // @IsString({ message: 'refreshToken must be a string' })
    refreshToken: string;
}