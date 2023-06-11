import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { SoftModelEntity } from '../../share/entity/softModel.entity';
import { User } from './user.entity';

@Entity({ name: 'userContacts' })
export class UserContacts extends SoftModelEntity {
  @Column()
  email: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @OneToOne(() => User, (user) => user.userCredentials)
  user: User;
}
