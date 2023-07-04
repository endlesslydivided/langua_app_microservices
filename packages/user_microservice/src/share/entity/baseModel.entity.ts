import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

export class BaseModelEntity extends BaseEntity {
  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
