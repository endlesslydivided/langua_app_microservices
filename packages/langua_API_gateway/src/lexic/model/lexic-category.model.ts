import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

import { IdentifiedModel } from '../../share/model/identified.model';
import { PaginatedModel } from '../../share/model/paginated.model';

@ObjectType()
export class LexicCategory extends IdentifiedModel {
  @Field((type) => GraphQLString, { nullable: true })
  categoryName: string;

  @Field((type) => GraphQLString, { nullable: true })
  creatorUserId: string;

}

@ObjectType()
export class PaginatedLexicCategory extends PaginatedModel<LexicCategory>(LexicCategory) {}


