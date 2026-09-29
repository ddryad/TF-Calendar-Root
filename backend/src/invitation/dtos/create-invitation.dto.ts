import { IsEnum, IsNumber, IsNotEmpty, IsDate, IsString, IsOptional, IsPositive } from "class-validator";
import { InvitationStatut } from "../enums/invitation-statut.enum";

export class CreateInvitationDto{

    @IsNumber()
    @IsNotEmpty()
    senderId: number;

    @IsNumber()
    @IsNotEmpty()
    invitedUserId: number;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNumber()
    @IsOptional()
    activiteGroupeId?: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    activiteId?: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    amiId?: number;

}