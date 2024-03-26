import { IsArray, IsDataURI, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Coin } from "../project.interface";
export class CreateProjectDto {
    @IsString()
    @MinLength(2)
    @MaxLength(25)
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    // @IsDataURI()
    link: string;

    @IsArray()
    @IsNotEmpty()
    currencies: Coin[];
}
