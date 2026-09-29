import { IInvitationFactory } from "./invitation-interface.factory";
import { InvitationActiviteFactory } from "./invitation-activite.factory";
import { InvitationAmiFactory } from "./invitation-ami.factory";
import { BadRequestException } from "@nestjs/common";
import { CreateInvitationDto } from "../dtos/create-invitation.dto";

export class InvitationFactory{
  create(type: CreateInvitationDto["type"]): IInvitationFactory{
    switch (type) {
      case "ACTIVITE":
        return new InvitationActiviteFactory();

      case "AMI":
        return new InvitationAmiFactory();

      default:
        throw new BadRequestException("Type d'invitation invalide");
    }
  }
}