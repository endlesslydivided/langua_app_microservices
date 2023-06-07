import { DeleteDateColumn } from 'typeorm';

import { BaseModelEntity } from './baseModel.entity';

export class SoftModelEntity extends BaseModelEntity {
  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt?: Date;
}
