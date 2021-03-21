import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';
import { RoleModel } from '../../../domain/roles';
import { UserModel } from '../../../domain/users';

import { BaseTimestampWithSoftDelete } from './baseTimestamp';
import User from './user';

@Entity()
@Unique(['name'])
export default class Role extends BaseTimestampWithSoftDelete implements RoleModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => User, user => user.role)
  // users: User[];
  users: UserModel[];
}
