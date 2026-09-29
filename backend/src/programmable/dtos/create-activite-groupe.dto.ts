import { CreateActiviteDto } from './create-activite.dto';
import { IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateActiviteGroupeDto extends CreateActiviteDto {
    @IsOptional()
    @IsNumber()
    groupeId?: number;

    @IsArray()
    @IsNumber({}, { each: true })
    participantIds: number[];
}
