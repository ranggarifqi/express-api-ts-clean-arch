import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseTimestamp {
  @CreateDateColumn()
  createdAt: number;

  @Column({ nullable: true })
  createdBy: string;

  @UpdateDateColumn()
  updatedAt: number;

  @Column({ nullable: true })
  updatedBy: string;
}

export abstract class BaseTimestampWithSoftDelete {
  @CreateDateColumn()
  createdAt: number;

  @Column({ nullable: true })
  createdBy: string;

  @UpdateDateColumn()
  updatedAt: number;

  @Column({ nullable: true })
  updatedBy: string;

  @DeleteDateColumn()
  deletedAt: number;

  @Column({ nullable: true })
  deletedBy: string;
}
