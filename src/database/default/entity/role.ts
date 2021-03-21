import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';

import { BaseTimestampWithSoftDelete } from './baseTimestamp';
import User from './user';

@Entity()
@Unique(['name'])
export default class Role extends BaseTimestampWithSoftDelete {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
