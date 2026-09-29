import { Injectable, BadRequestException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { CreateUserDTO } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';
import { CookieStrategy } from './strategies/cookie.strategy';

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {

    constructor(private UsersService : UsersService, private CookieStrategy : CookieStrategy) {} 

    async signin(email : string, password : string) {

        return this.CookieStrategy.validate(email, password);

    }

    async signup(userDTO : CreateUserDTO) {
        
        const user = await this.UsersService.findByEmail(userDTO.email)

        if (user){
            throw new BadRequestException("user already exist")
        }
        
        const salt = randomBytes(8).toString('hex')
        const hash = (await scrypt(userDTO.password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex')

        return this.UsersService.createUser({
            email : userDTO.email,
            password : result,
            nomComplet : userDTO.nomComplet,
            omnivoxDA : userDTO.omnivoxDA,
            omnivoxPassword : userDTO.omnivoxPassword,
            calendrierId : userDTO.calendrierId
        })

    }

}
