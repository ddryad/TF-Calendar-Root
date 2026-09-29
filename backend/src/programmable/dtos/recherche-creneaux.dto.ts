import { IsDateString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class RechercheCreneauxDto {
    @IsDateString()
    @IsNotEmpty()
    dateDebut: Date;

    @IsDateString()
    @IsNotEmpty()
    dateFin: Date;

    @Type(() => Number)
    @IsNumber()
    @Min(0.5)
    dureeHeures: number;
}
