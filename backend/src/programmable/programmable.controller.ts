// on remarque ici que j'utilise des dtos + currentuser sur certaines routes
// pour empêcher d'usurper l'identite d'un utilisateur
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProgrammableService } from './programmable.service';
import { CreateEvenementDto } from './dtos/create-evenement.dto';
import { CreateActiviteDto } from './dtos/create-activite.dto';
import { CreateActiviteGroupeDto } from './dtos/create-activite-groupe.dto';
import { ReplanifierDto } from './dtos/replanifier.dto';
import { RechercheCreneauxDto } from './dtos/recherche-creneaux.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@UseGuards(AuthGuard)
@Controller('programmable')
export class ProgrammableController {
  constructor(private readonly programmableService: ProgrammableService) { }

  @Get()
  findAll() {
    return this.programmableService.findAll();
  }

  @Get('conflits')
  getConflits(@CurrentUser() user: User) {
    return this.programmableService.getConflits(user.id);
  }

  @Get('creneaux-disponibles')
  getCreneauxDisponibles(@CurrentUser() user: User, @Query() query: RechercheCreneauxDto) {
    return this.programmableService.trouverCreneauxDisponibles(
      user.id, query.dateDebut, query.dateFin, query.dureeHeures,
    );
  }

  @Get('user/:userId')
  findAllByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.programmableService.findAllByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.programmableService.findOne(id);
  }

  @Post('evenement')
  createEvenement(@CurrentUser() user: User, @Body() createDto: CreateEvenementDto) {
    return this.programmableService.createEvenement(createDto, user.id, user.calendrierId);
  }

  @Post('activite')
  createActivite(@CurrentUser() user: User, @Body() createDto: CreateActiviteDto) {
    return this.programmableService.createActivite(createDto, user.id, user.calendrierId);
  }

  @Post('activite-groupe')
  createActiviteGroupe(@CurrentUser() user: User, @Body() createDto: CreateActiviteGroupeDto) {
    return this.programmableService.createActiviteGroupe(createDto, user.id, user.calendrierId);
  }

  @Patch('activite-groupe/:id')
  updateActiviteGroupe(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User, @Body() updateDto: CreateActiviteGroupeDto) {
    return this.programmableService.updateActiviteGroupe(id, updateDto, user.id);
  }

  @Patch('activite/:id')
  updateActivite(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User, @Body() activite: CreateActiviteDto) {
    return this.programmableService.updateActivite(id, activite, user.id);
  }

  @Patch('activite/:id/replanifier')
  replanifierActivite(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
    @Body() dto: ReplanifierDto,
  ) {
    return this.programmableService.replanifierActivite(id, dto.nouvelleDateDepart, user.id);
  }

  @Patch('evenement/:id')
  updateEvenement(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User, @Body() evenement: CreateEvenementDto) {
    return this.programmableService.updateEvenement(id, evenement, user.id);
  }

  @Delete(':id')
  deleteProgrammable(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.programmableService.deleteProgrammable(id, user.id);
  }

  @Post('activite-groupe/:id/participants/:participantId')
  ajouterParticipant(
    @Param('id', ParseIntPipe) id: number,
    @Param('participantId', ParseIntPipe) participantId: number,
    @CurrentUser() user: User,
  ) {
    return this.programmableService.ajouterParticipant(id, participantId, user.id);
  }

  @Delete('activite-groupe/:id/participants/:participantId')
  retirerParticipant(
    @Param('id', ParseIntPipe) id: number,
    @Param('participantId', ParseIntPipe) participantId: number,
    @CurrentUser() user: User,
  ) {
    return this.programmableService.retirerParticipant(id, participantId, user.id);
  }
}
