import { IsDateString, IsNotEmpty } from 'class-validator';

export class ReplanifierDto {
    @IsDateString()
    @IsNotEmpty()
    nouvelleDateDepart: Date;
}
