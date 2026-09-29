import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { AuthStrategy } from './authStrategy.interface';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';



const scrypt = promisify(_scrypt)


@Injectable()
export class CookieStrategy implements AuthStrategy {

    constructor (private usersService: UsersService) {}

async validate(email: string, password:string): Promise<User>{

        const user = await this.usersService.findByEmail(email);

        if (!user){
            throw new BadRequestException("user doesnt exist")
        }

        const [salt, storedHash] = user.passwordHash.split('.')
        
        const hash = (await scrypt(password, salt, 32)) as Buffer

        if (hash.toString('hex') != storedHash){
            throw new BadRequestException('wrong password')
        }

        return user;

    }

}
