import { Field, InputType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@InputType()
export class SingUpInput {
  @Field((type) => GraphQLString,{nullable:false})
  email:string;

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

  @Field((type) => GraphQLString,{nullable:false})
  nickname:string;

  @Field((type) => GraphQLString,{nullable:false})
  phoneNumber:string;
}

@InputType()
export class SingInInput {
  @Field((type) => GraphQLString,{nullable:false})
  email:string;

  @Field((type) => GraphQLString,{nullable:false})
  password:string;
}
