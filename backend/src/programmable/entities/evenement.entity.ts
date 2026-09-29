import { ChildEntity, Column } from 'typeorm';
import { Programmable } from './programmable.entity';

@ChildEntity('evenement')
export class Evenement extends Programmable {
  @Column()
  dureeJours: number;
}