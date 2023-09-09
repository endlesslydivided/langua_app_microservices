import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

import { PaginatedModel } from 'src/share/model/paginated.model';
import { IdentifiedModel } from '../../share/model/identified.model';

@ObjectType()
export class UserContacts extends IdentifiedModel {

  @Field((type) => GraphQLString,{nullable:true})
  email:string;

  @Field((type) => GraphQLString,{nullable:true})
  phoneNumber:string;

}

@ObjectType()
export class UserCredentials extends IdentifiedModel {

  @Field((type) => GraphQLString,{nullable:true})
  nickname:string;

}

@ObjectType()
export class User extends IdentifiedModel {

  @Field((type) => GraphQLString,{nullable:true})
  password:string;

  @Field((type) => GraphQLString,{nullable:true})
  firstname:string;

  @Field((type) => GraphQLString,{nullable:true})
  surname:string;

  @Field((type) => GraphQLString,{nullable:true})
  sex:string;

  @Field((type) => GraphQLString,{nullable:true})
  birthday:string;

  @Field((type) => GraphQLString,{nullable:true})
  country:string;

  @Field((type) => GraphQLString,{nullable:true})
  city:string;

  @Field((type) => GraphQLString,{nullable:true})
  nativeLanguage:string;

  @Field((type) => UserCredentials,{nullable:true})
  userCredentials:UserCredentials;

  @Field((type) => UserContacts,{nullable:true})
  userContacts:UserContacts;

}

@ObjectType()
export class UpdateUserReponse{
    @Field((type) => GraphQLString, { nullable: false })
    status: string;
}


@ObjectType()
export class PaginatedUser extends PaginatedModel<User>(User){}

