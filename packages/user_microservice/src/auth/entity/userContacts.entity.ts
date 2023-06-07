import { Column, Entity, OneToOne } from 'typeorm';

import { SoftModelEntity } from '../../share/entity/softModel.entity';
import { User } from './user.entity';

@Entity({ name: 'userCredentials' })
export class UserCredentials extends SoftModelEntity {
  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'password_salt' })
  passwordSalt: string;

  @Column()
  nickname: string;

  @OneToOne(() => User, (user) => user.contacts)
  user: User;
}
