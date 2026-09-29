import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calendrier } from './calendrier.entity';
import { CreateCalendrierDto } from './dtos/create-calendrier.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class CalendrierService {

    constructor(
        @InjectRepository(Calendrier)
        private readonly calendrierRepo: Repository<Calendrier>,
        private readonly usersService: UsersService,
    ) { }

    async create(dto: CreateCalendrierDto, userId: number): Promise<Calendrier> {
        const existing = await this.findByUser(userId);
        if (existing) {
            throw new ConflictException('Cet utilisateur possède déjà un calendrier');
        }

        const calendrier = this.calendrierRepo.create({ ...dto, ownerId: userId });
        const saved = await this.calendrierRepo.save(calendrier);
        await this.usersService.updateUser(userId, { calendrierId: saved.id });
        return saved;
    }

    async findOne(id: number): Promise<Calendrier> {
        const calendrier = await this.calendrierRepo.findOne({ where: { id } });
        if (!calendrier) {
            throw new NotFoundException(`Calendrier avec id ${id} non trouvé`);
        }
        return calendrier;
    }

    async findByUser(userId: number): Promise<Calendrier | null> {
        return this.calendrierRepo.findOne({ where: { ownerId: userId } });
    }

    async remove(id: number, userId: number): Promise<void> {
        const calendrier = await this.findOne(id);
        await this.calendrierRepo.remove(calendrier);
        await this.usersService.updateUser(userId, { calendrierId: null });
    }
}
