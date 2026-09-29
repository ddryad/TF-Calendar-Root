import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Evenement } from '../programmable/entities/evenement.entity';
import type { Activite } from '../programmable/entities/activite.entity';

@Entity()
export class Calendrier {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    ownerId: number;

    @OneToMany('Evenement', (e: Evenement) => e.calendrier, { cascade: true, eager: false })
    evenements: Evenement[];

    @OneToMany('Activite', (a: Activite) => a.calendrier, { cascade: true, eager: false })
    activites: Activite[];
}
