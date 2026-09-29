import { IsEmail, IsOptional, IsString, IsNumber } from "class-validator";

export class UpdateUserDTO{

    @IsEmail()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    password?: string

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
