import { Controller, Body, Post, Patch, Param, Get, Session, UseGuards, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserDTO } from './dtos/user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('users')
export class UsersController {

    constructor(private service: UsersService) { }


    @Get("friends")
    getFriends(@CurrentUser() user: User){
        return this.service.getFriends(user.id)
    }
    @Get("search")
    searchUsers(@Query("query") query: string){
        return this.service.searchUsers(query);
    }

    @Serialize(UserDTO)
    @Get("/:id")
    async getOne(@Param('id') id: number) {
        return this.service.findOneUser(id)
    }

    @UseGuards(AuthGuard)
    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
        return this.service.updateUser(parseInt(id), body)
    }

    @Serialize(UserDTO)
    @Get("")
    getAllUsers() {
        return this.service.findAll()
    }

   

}
