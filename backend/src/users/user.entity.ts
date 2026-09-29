import { Exclude } from "class-transformer";
import { AfterInsert, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    //password is nullable for Oauth users
    @Exclude()
    @Column({nullable: true})
    passwordHash: string

    @Column({ nullable: true })
    nomComplet: string

    @Column({ nullable: true })
    omnivoxDA: number

    @Exclude()
    @Column({ nullable: true })
    omnivoxPasswordHash: string

    //type union pour permettre valeur nulle quand on delete le calendrier du user ou quand il est pas encore crée
    @Column({ nullable: true, type: 'int' })
    calendrierId: number | null

    @ManyToMany(() => User)
    @JoinTable()
    friends: User[]

    @AfterInsert()
    verify() {
        console.log(`User with id : ${this.id}, email : ${this.email} has used password : ${this.passwordHash}`)
    }


}