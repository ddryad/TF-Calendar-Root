import { Module } from '@nestjs/common';
import { OmnivoxController } from './omnivox.controller';
import { OmnivoxService } from './omnivox.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programmable } from 'src/programmable/entities/programmable.entity';
import { Activite } from 'src/programmable/entities/activite.entity';
import { Evenement } from 'src/programmable/entities/evenement.entity';
import { ActiviteGroupe } from 'src/programmable/entities/activite-groupe.entity';
import { ProgrammableService } from 'src/programmable/programmable.service';
import { ProgrammableModule } from 'src/programmable/programmable.module';

@Module({
  imports:[HttpModule, ProgrammableModule],
  controllers: [OmnivoxController],
  providers: [OmnivoxService]
})
export class OmnivoxModule {}
