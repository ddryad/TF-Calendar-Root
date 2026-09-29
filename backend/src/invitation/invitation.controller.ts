import { Controller, Get, Post, Patch, Param, Body, ParseIntPipe, UseGuards, Delete, Req } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { CreateInvitationDto } from './dtos/create-invitation.dto';
import { UpdateInvitationDto } from './dtos/update-invitation.dto';
import { Invitation } from './invitation.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';


@UseGuards(AuthGuard)
@Controller('invitation')// /invitation
export class InvitationController {
    /*
    GET /invitation
    GET /invitation/:id
    POST /invitation
    PATCH /invitation/:id/accept
    PATCH /invitation/:id/refuse

    */
   constructor(private readonly invitationService: InvitationService){}


   @Get() // recupère toutes les invitations
   findAll(){
    return this.invitationService.findAll();
   }

   @Get('received') //mes invitations reçu
   getMyInvitations(@CurrentUser() user: User) {
   return this.invitationService.getMyInvitations(user.id);
   }

   @Get('sent') //mes invitations envoyées
   getSent(@CurrentUser() user: User) {
   return this.invitationService.getSentInvitations(user.id);
   }
   
   @Get(':id') // recupère une invitation par son id 
   findOne(@Param('id', ParseIntPipe) id: number){
    return this.invitationService.findOne(id);
   }


   @Post() // crée une invitation 
   create(@Body() invitationDto: CreateInvitationDto){
    return this.invitationService.createInvitation(invitationDto);
   }

   @Patch(':id/accept') // accepte l'invitation
   accept(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User, @Body('force') force: boolean ){
    return this.invitationService.acceptInvitation(id, user.id, force);
   }
 
   @Patch(':id/refuse') // refuse l'invitation 
   refuse(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User){
    return this.invitationService.refuseInvitation(id, user.id);
   }

   @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
    return this.invitationService.remove(id);
    }


}
