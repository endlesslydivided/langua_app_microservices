import { Field, ObjectType } from "@nestjs/graphql";
import { GraphQLString } from "graphql";


@ObjectType()
export class SignInResponse{
    @Field((type) => GraphQLString, { nullable: false })
    accessToken: string;

    @Field((type) => GraphQLString, { nullable: false })
    refershToken: string;
}

@ObjectType()
export class RefreshResponse{
    @Field((type) => GraphQLString, { nullable: false })
    accessToken: string;

    @Field((type) => GraphQLString, { nullable: false })
    refershToken: string;
}

@ObjectType()
export class SignUpResponse{
    @Field((type) => GraphQLString, { nullable: false })
    status: string;
}

@ObjectType()
export class SignOutResponse{
    @Field((type) => GraphQLString, { nullable: false })
    status: string;
}


