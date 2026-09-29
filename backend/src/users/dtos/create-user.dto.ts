import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class CreateUserDTO{


    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    password : string

    @IsString()
    @IsOptional()
    nomComplet?: string

    @IsNumber()
    @IsOptional()
    omnivoxDA?: number

    @IsString()
    @IsOptional()
    omnivoxPassword?: string

    @IsNumber()
    @IsOptional()
    calendrierId?: number
}