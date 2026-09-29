import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/users/user.entity";
import { InvitationStatut } from "./enums/invitation-statut.enum";

@Entity()
export class Invitation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    senderId: number;

    @Column()
    invitedUserId: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "senderId"})
    sender: User;

    @ManyToOne(() => User)
    @JoinColumn({name: "invitedUserId"})
    invitedUser: User;

    @Column({ type: 'varchar', enum: InvitationStatut })
    statut: InvitationStatut;

    @Column()
    sentAt: Date;

    @Column() 
    type: string;

    @Column({ nullable: true }) 
    activiteGroupeId: number;

    @Column({nullable : true})
    activiteId?: number;

    @Column({nullable : true})
    amiId?: number;
}