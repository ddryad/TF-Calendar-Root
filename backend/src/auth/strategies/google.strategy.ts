import { Injectable } from "@nestjs/common";
import { AuthStrategy } from "./authStrategy.interface";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { UsersService } from "src/users/users.service";
import { User } from "src/users/user.entity";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') implements AuthStrategy{

    constructor(private usersService: UsersService){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_REDIRECT_URL ?? process.env.GOOGLE_CALLBACK_URL ?? 'http://localhost:3000/auth/google/callback',


            scope: ['email', 'profile'],
        });
    }


    async validate(accessToken: string,
        refreshToken: string,
        profile: Profile): Promise<User>{

            const email = profile.emails?.[0]?.value;
            const nomComplet = profile.displayName;

            if(!email) {
                throw new Error('Email not found');
            }

            let user = await this.usersService.findByEmail(email);

            if(!user){
                user = await this.usersService.createUser({
                    email,
                    password: 'OAUTH_NO_PASSWORD',
                    nomComplet,                
                })
            }

            return user;
        }



}