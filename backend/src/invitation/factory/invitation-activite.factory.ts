import { BadRequestException } from "@nestjs/common";
import { Invitation } from "../invitation.entity";
import { IInvitationFactory } from "./invitation-interface.factory";
import { CreateInvitationDto } from "../dtos/create-invitation.dto";
export class InvitationActiviteFactory implements IInvitationFactory {
  create(data: CreateInvitationDto): Partial<Invitation> {
    if (!data.activiteId && !data.activiteGroupeId){
      throw new BadRequestException("activite ID ou activite ID requis");
    }

    return {
      senderId: data.senderId,
      invitedUserId: data.invitedUserId,
      type: "ACTIVITE",
      activiteId: data.activiteId,
      activiteGroupeId: data.activiteGroupeId,
    };
  }
}