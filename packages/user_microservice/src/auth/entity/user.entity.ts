import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { SoftModelEntity } from '../../share/entity/softModel.entity';
import { UserCredentials } from './userContacts.entity';
import { UserContacts } from './userCredentials.entity';
@Entity({ name: 'user' })
export class User extends SoftModelEntity {
  @Column()
  firstname: string;

  @Column()
  surname: string;

  @Column({nullable:true})
  birthday: Date;

  @Column({nullable:true})
  country: string;

  @Column({nullable:true})
  city: string;

  @Column({ name: 'native_language', nullable:true })
  nativeLanguage: string;

  @OneToOne(() => UserCredentials, {
    nullable: true,
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn()
  userCredentials: UserCredentials;

  @OneToOne(() => UserContacts, {
    nullable: true,
    deferrable: 'INITIALLY DEFERRED',
  })
  @JoinColumn()
  userContacts: UserContacts;
}
