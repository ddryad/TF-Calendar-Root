import { ChildEntity, JoinTable, ManyToMany } from 'typeorm';
import { Activite } from './activite.entity';
import { User } from '../../users/user.entity';

@ChildEntity('activite_groupe')
export class ActiviteGroupe extends Activite {
  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];
}
