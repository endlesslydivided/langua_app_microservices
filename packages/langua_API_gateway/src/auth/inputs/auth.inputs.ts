import { Field, InputType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@InputType()
export class SignUpInput {
  @Field((type) => GraphQLString,{nullable:false})
  email:string;

  @Field((type) => GraphQLString,{nullable:true})
  password:string;

  @Field((type) => GraphQLString,{nullable:false})
  firstname:string;

  @Field((type) => GraphQLString,{nullable:false})
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

  @Field((type) => GraphQLString,{nullable:true})
  nickname:string;

  @Field((type) => GraphQLString,{nullable:true})
  phoneNumber:string;
}

@InputType()
export class SignInInput {
  @Field((type) => GraphQLString,{nullable:false})
  email:string;

  @Field((type) => GraphQLString,{nullable:false})
  password:string;
}

@InputType()
export class RefreshInput {
  @Field((type) => GraphQLString,{nullable:false})
  refreshToken:string;
}
