import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OmnivoxService } from './omnivox.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';

@Controller('omnivox')
export class OmnivoxController {

    constructor(private omnivoxService: OmnivoxService) {}

    @UseGuards(AuthGuard)
    @Get("/cours")
    async getCours(@CurrentUser() user : User){
        return this.omnivoxService.getCours(user.omnivoxDA, user.omnivoxPasswordHash)
    }

    @UseGuards(AuthGuard)
    @Post('/import')
    async importCours(
        @CurrentUser() user: User,
        @Query('calendrierId') calendrierId?: string,
    ) {
        const calId = calendrierId ? parseInt(calendrierId, 10) : null;
        return this.omnivoxService.importCours(user.omnivoxDA, user.omnivoxPasswordHash, user.id, calId);
    }


}
