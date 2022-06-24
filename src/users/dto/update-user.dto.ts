import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {

    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    surname?: string;

}
