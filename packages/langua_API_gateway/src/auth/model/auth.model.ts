import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLString } from "graphql";


@ObjectType()
export class SignInResponse{
    @Field((type) => GraphQLString, { nullable: false })
    accessToken: string;
}
