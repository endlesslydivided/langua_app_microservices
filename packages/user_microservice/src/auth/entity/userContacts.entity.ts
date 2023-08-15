import { Column, Entity, JoinColumn, JoinTable, OneToOne } from 'typeorm';

import { SoftModelEntity } from '../../share/entity/softModel.entity';
import { User } from './user.entity';

@Entity({ name: 'userCredentials' })
export class UserCredentials extends SoftModelEntity {
  @Column({ name: 'password_hash',nullable:true })
  passwordHash: string;

  @Column({ name: 'password_salt',nullable:true })
  passwordSalt: string;

  @Column({nullable:true})
  nickname: string;

  @OneToOne(() => User, (user) => user.userContacts)
  user: User;
}
