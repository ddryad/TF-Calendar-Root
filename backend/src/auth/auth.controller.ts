import { Body, Controller, Get, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from 'src/users/dtos/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuard as MyAuthGUard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator'; 
import { User } from 'src/users/user.entity';




@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService) {}

    @Serialize(UserDTO)
    @Post("/signup")
    async createUser(@Body() body : CreateUserDTO, @Session() session : any){
        const user = await this.authService.signup(body)
        session.userId = user.id
        return user
    }

    @Serialize(UserDTO)
    @Post("/signin")
    async signin(@Body() body: CreateUserDTO, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('/signout')
    async signout(@Session() session: any, @Req() req: any) {
        req.session = null;
    }



    @UseGuards(MyAuthGUard)
    @Serialize(UserDTO)
    @Get("/whoami")
    async whoAmI(@CurrentUser() user: User) {
        return user;
    }




    @UseGuards(AuthGuard('google'))
    @Get('/google')
    googleLogin() {}

    @Get('/google/callback')
    @UseGuards(AuthGuard('google'))
    async googleCallback(@Req() req: any, @Session() session: any, @Res() res: any) {
        session.userId = req.user.id;
        // Redirect au frontend apres login
        res.redirect('http://localhost:5173');
        // return { id: req.user.id, email: req.user.email, nomComplet: req.user.nomComplet };
    }    


}
