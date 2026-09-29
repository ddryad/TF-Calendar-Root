import { ChildEntity, Column } from 'typeorm';
import { Programmable } from './programmable.entity';

export enum NiveauPriorite {
  URGENT = 'URGENT',
  IMPORTANCE_MOYENNE = 'IMPORTANCE_MOYENNE',
  IMPORTANCE_BASSE = 'IMPORTANCE_BASSE',
}

@ChildEntity('activite')
export class Activite extends Programmable {
  @Column()
  dureeHeures: number;

  @Column({
    type: 'varchar',
    enum: NiveauPriorite,
    default: NiveauPriorite.IMPORTANCE_MOYENNE,
  })

  priorite: NiveauPriorite;
}