import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import type { Calendrier } from '../../calendrier/calendrier.entity';
import { CategorieProgrammable } from '../categorie.enum';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Programmable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  dateDepart: Date;

  @Column()
  userId: number;

  @Column({ nullable: true, type: 'int' })
  calendrierId: number | null;

  @Column()
  type: string;

   
  @Column({
    type: 'varchar',
    enum: CategorieProgrammable,
    default: CategorieProgrammable.AUTRE,
    nullable: true,
  })
  categorie: CategorieProgrammable;
 

  @ManyToOne('Calendrier', { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'calendrierId' })
  calendrier: Calendrier;
}