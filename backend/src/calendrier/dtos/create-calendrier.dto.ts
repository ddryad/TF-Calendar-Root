import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCalendrierDto {

    @IsString()
    @IsNotEmpty()
    nom: string;
}
