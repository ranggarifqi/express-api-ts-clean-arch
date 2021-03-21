import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
} from 'typeorm';

import { BaseTimestamp } from './baseTimestamp';
import Role from './role';

@Entity()
@Unique(['email'])
@Unique(['mobile'])
export default class User extends BaseTimestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  active: boolean;

  @Column()
  roleId: string;

  @ManyToOne(() => Role, role => role.users)
  role: Role;
}
