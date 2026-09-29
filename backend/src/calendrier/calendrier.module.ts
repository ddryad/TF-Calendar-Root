import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calendrier } from './calendrier.entity';
import { CalendrierService } from './calendrier.service';
import { CalendrierController } from './calendrier.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Calendrier]), UsersModule],
    controllers: [CalendrierController],
    providers: [CalendrierService],
})
export class CalendrierModule {}
