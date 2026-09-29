import { Injectable, NotFoundException, Inject, forwardRef,ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { CreateInvitationDto } from './dtos/create-invitation.dto';
import { UpdateInvitationDto } from './dtos/update-invitation.dto';
import { InvitationStatut } from './enums/invitation-statut.enum';
import { InvitationFactory } from "./factory/invitation.factory";
import { ProgrammableService } from '../programmable/programmable.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InvitationService {
    constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,

    private invitationFactory: InvitationFactory

    ,@Inject(forwardRef(() => ProgrammableService))
    private readonly programmableService: ProgrammableService,

    private readonly usersService: UsersService,
    ){}

    async findAll(){
        return await this.invitationRepository.find()
    }

    async findOne(id: number){
        const invitation = await this.invitationRepository.findOne({where:{id}, relations: ["sender", "invitedUser"]})
        if(!invitation){
            throw new NotFoundException(`Invitation avec l'id ${id} est inexistante`)
        }
        return invitation
    }

    async getMyInvitations(userId: number) {
        return this.invitationRepository.find({
          where: { invitedUserId: userId },
          relations: ["sender"],
        });
      }

      async getSentInvitations(userId: number) {
        return this.invitationRepository.find({
          where: { senderId: userId },
          relations: ["invitedUser"],
        });
      }

    async createInvitation(invitationDto: CreateInvitationDto){
        
        const specificFactory = this.invitationFactory.create(invitationDto.type);
    
        const baseData = specificFactory.create(invitationDto);
    
        const invitation = this.invitationRepository.create({
            ...baseData,
            statut: InvitationStatut.PENDING,
            sentAt: new Date(),
        });
    
        return this.invitationRepository.save(invitation);
    }

    async acceptInvitation(id: number, userId: number, force = false){
        const invitation  = await this.findOne(id)

        if (invitation.invitedUserId !== userId){
            throw new ForbiddenException("Vous ne pouvez pas accepter cette invitation");
        }
        
        if (invitation.type === 'ACTIVITE' && invitation.activiteGroupeId) {
            // L'ajout s'assure des conflits avant de push dans participants
            await this.programmableService.ajouterParticipant(
                invitation.activiteGroupeId, 
                invitation.invitedUserId, 
                invitation.senderId,
                force

            );
        }

        if (invitation.type === 'AMI'){
            const sender = await this.usersService.findUserWithFriends(invitation.senderId);
            const receiver = await this.usersService.findUserWithFriends(invitation.invitedUserId);
            if(!sender || !receiver){
                throw new NotFoundException("User introuvable");
            }
            
            sender.friends.push(receiver);
            receiver.friends.push(sender);

            await this.usersService.save(sender);
            await this.usersService.save(receiver);
        }


        invitation.statut = InvitationStatut.ACCEPTED;
        return this.invitationRepository.save(invitation);
    }

    async refuseInvitation(id: number, userId: number){
        const invitation  = await this.findOne(id)

        if (invitation.invitedUserId !== userId){
            throw new ForbiddenException("Vous ne pouvez pas accepter cette invitation");
        }

        invitation.statut = InvitationStatut.REFUSED;
        return this.invitationRepository.save(invitation);
    }

    async remove(id: number) {
        const invitation = await this.findOne(id);
        return this.invitationRepository.remove(invitation);
      }

    



}
