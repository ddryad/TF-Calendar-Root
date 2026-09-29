import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import {  CreateProgrammableDto } from 'src/programmable/dtos/create-programmable.dto';
// import { NiveauPriorite } from '../entities/activite.entity';

export class CourDto extends CreateProgrammableDto {
  @IsOptional()
  @IsNumber()
  @Min(0.5)
  dureeHeures: number;

  // @IsOptional()
  // @IsEnum(NiveauPriorite)
  // priorite: NiveauPriorite;
}
