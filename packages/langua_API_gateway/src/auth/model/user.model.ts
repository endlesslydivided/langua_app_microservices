import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

import { IdentifiedModel } from '../../share/model/identified.model';
import { ResponseModel } from '../../share/model/status.model';
import { PaginatedModel } from 'src/share/model/paginated.model';

@ObjectType()
export class User extends IdentifiedModel {

  @Field((type) => GraphQLString,{nullable:false})
  password:string;

  @Field((type) => GraphQLString,{nullable:false})
  firstname:string;

  @Field((type) => GraphQLString,{nullable:false})
  surname:string;

  @Field((type) => GraphQLString,{nullable:false})
  sex:string;

  @Field((type) => GraphQLString,{nullable:false})
  birthday:string;

  @Field((type) => GraphQLString,{nullable:false})
  country:string;

  @Field((type) => GraphQLString,{nullable:false})
  city:string;

  @Field((type) => GraphQLString,{nullable:false})
  nativeLanguage:string;

  @Field((type) => UserCredentials,{nullable:false})
  userCredentials:string;

  @Field((type) => UserContacts,{nullable:false})
  userContacts:string;

}

@ObjectType()
export class UserContacts extends IdentifiedModel {

  @Field((type) => GraphQLString,{nullable:false})
  email:string;

  @Field((type) => GraphQLString,{nullable:false})
  phoneNumber:string;

}

@ObjectType()
export class UserCredentials extends IdentifiedModel {

  @Field((type) => GraphQLString,{nullable:false})
  nickname:string;

}

@ObjectType()
export class UserResponse extends ResponseModel(User) {}

@ObjectType()
export class PaginatedUser extends PaginatedModel(User){}

@ObjectType()
export class PaginatedUserResponse extends ResponseModel(PaginatedUser) {}