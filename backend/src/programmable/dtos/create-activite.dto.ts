import { IsBoolean, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { CreateProgrammableDto } from './create-programmable.dto';
import { NiveauPriorite } from '../entities/activite.entity';

export class CreateActiviteDto extends CreateProgrammableDto {
  @IsOptional()
  @IsNumber()
  @Min(0.5)
  dureeHeures: number;

  @IsOptional()
  @IsEnum(NiveauPriorite)
  priorite: NiveauPriorite;

  @IsOptional()
  @IsBoolean()
  forceCreate?: boolean;
}
