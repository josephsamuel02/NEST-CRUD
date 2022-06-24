import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class AuthDto {

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsNotEmpty()
    password: string;


}