import { CreateInvitationDto } from "../dtos/create-invitation.dto";
import { Invitation } from "../invitation.entity"

export interface IInvitationFactory{
    create(data: CreateInvitationDto): Partial<Invitation>;
}