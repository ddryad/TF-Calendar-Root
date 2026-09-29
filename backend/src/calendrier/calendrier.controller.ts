import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CalendrierService } from './calendrier.service';
import { CreateCalendrierDto } from './dtos/create-calendrier.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@UseGuards(AuthGuard)
@Controller('calendrier')
export class CalendrierController {

    constructor(private readonly calendrierService: CalendrierService) { }

    @Post()
    create(@CurrentUser() user: User, @Body() dto: CreateCalendrierDto) {
        return this.calendrierService.create(dto, user.id);
    }

    @Get('me')
    getMyCalendrier(@CurrentUser() user: User) {
        return this.calendrierService.findByUser(user.id);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.calendrierService.findOne(id);
    }

    @Delete('me')
    async deleteMine(@CurrentUser() user: User) {
        const calendrier = await this.calendrierService.findByUser(user.id);
        if (!calendrier) {
            throw new NotFoundException('Aucun calendrier trouvé pour cet utilisateur');
        }
        return this.calendrierService.remove(calendrier.id, user.id);
    }

    @Delete(':id')
    deleteOne(
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser() user: User,
    ) {
        return this.calendrierService.remove(id, user.id);
    }
}
