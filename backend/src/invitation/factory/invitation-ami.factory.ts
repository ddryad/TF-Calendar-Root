import { BadRequestException } from "@nestjs/common";
import { Invitation } from "../invitation.entity";
import { IInvitationFactory } from "./invitation-interface.factory";
import { CreateInvitationDto } from "../dtos/create-invitation.dto";
export class InvitationAmiFactory implements IInvitationFactory {
  create(data: CreateInvitationDto): Partial<Invitation> {
    if(!data.amiId){
      throw new BadRequestException("amiId requis pour l'invitation AMI");
    }
    return {
      senderId: data.senderId,
      invitedUserId: data.invitedUserId,
      type: "AMI",
      amiId: data.amiId,
    };
  }
}