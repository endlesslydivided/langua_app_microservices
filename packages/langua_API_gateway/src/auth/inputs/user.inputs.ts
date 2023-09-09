import { InputType, Field } from "@nestjs/graphql";
import { GraphQLString } from "graphql";

@InputType()
export class UpdateUserInput {

    @Field((type) => GraphQLString,{nullable:false})
    id:string;

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

    @Field((type) => GraphQLString,{nullable:true})
    nickname:string;

    @Field((type) => GraphQLString,{nullable:true})
    phoneNumber:string;
}