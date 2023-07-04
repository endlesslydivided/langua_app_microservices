import { Field, InputType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

@InputType()
export class CreateLexicCategoryInput {
  @Field((type) => GraphQLString, { nullable: false })
  categoryName: string;

  @Field((type) => GraphQLString, { nullable: false })
  creatorUserId: string;

}
