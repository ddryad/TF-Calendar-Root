import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Like } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findAll() {
        return await this.usersRepository.find()
    }

    async findByIds(ids: number[]): Promise<User[]> {
        return this.usersRepository.find({ where: { id: In(ids) } });
    }

    async createUser(userDTO: CreateUserDTO) {
        const user = this.usersRepository.create(
            { 
                email: userDTO.email, 
                passwordHash: userDTO.password, 
                nomComplet: userDTO.nomComplet, 
                omnivoxDA: userDTO.omnivoxDA,
                calendrierId : userDTO.calendrierId,
                omnivoxPasswordHash : userDTO.omnivoxPassword
            })
        await this.usersRepository.save(user)
        return user
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOneBy({ email: email })
        return user
    }

    async findOneUser(id: number) {
        const user = await this.usersRepository.findOne({ where: { id } })
        if (!user) {
            throw new NotFoundException(`Utilisateur avec id ${id} est inexistant`)
        }
        return user
    }

    async deleteOneUser(id: number) {

        let user = await this.usersRepository.findOneBy({ id: id })

        if (!user) throw new NotFoundException(`Utilisateur avec id ${id} est inexistant`)

        this.usersRepository.remove(user)

    }

    async updateUser(id: number, attrs: Partial<User>) {

        let user = await this.usersRepository.findOneBy({ id: id })

        if (!user) {
            throw new NotFoundException(`Utilisateur avec id ${id} est inexistant`)
        }

        const { omnivoxPassword, ...rest } = attrs as any;
        Object.assign(user, rest);
        if (omnivoxPassword) {
            user.omnivoxPasswordHash = omnivoxPassword;
        }

        return await this.usersRepository.save(user)
    }

    async findUserWithFriends(id: number){
        return this.usersRepository.findOne({where: {id: id}, relations: ["friends"],});
        
    }
    
    async getFriends(userId: number){
        const user =  await this.usersRepository.findOne({where: { id:userId}, relations: ["friends"],});

        return user?.friends || [];
    }

    async save(user: User){
        return this.usersRepository.save(user);
    }

    async searchUsers(query: string){
        return this.usersRepository.find({
            where:[{nomComplet: Like(`%${query}%`)},
                {
                    email: Like(`%${query}%`)
                }
            ],
            take: 5,
        });
    }

}
