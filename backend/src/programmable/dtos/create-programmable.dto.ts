import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategorieProgrammable } from '../categorie.enum';

export class CreateProgrammableDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dateDepart: Date;

 
  @IsEnum(CategorieProgrammable)
  @IsOptional()
  categorie?: CategorieProgrammable;
}
