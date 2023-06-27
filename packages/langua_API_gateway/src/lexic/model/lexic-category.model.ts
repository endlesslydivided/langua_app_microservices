import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

import { IdentifiedModel } from '../../share/model/identified.model';
import { PaginatedModel } from '../../share/model/paginated.model';
import { ResponseModel } from '../../share/model/status.model';

@ObjectType()
export class LexicCategory extends IdentifiedModel {
  @Field((type) => GraphQLString, { nullable: false })
  categoryName: string;

  @Field((type) => GraphQLString, { nullable: false })
  creatorUserId: string;

}

@ObjectType()
export class PaginatedLexicCategory extends PaginatedModel(LexicCategory) {}

@ObjectType()
export class PaginatedLexicCategoryResponse extends ResponseModel(PaginatedLexicCategory) {}

@ObjectType()
export class LexicCategoryResponse extends ResponseModel(LexicCategory) {}

@ObjectType()
export class ModifyLexicCategoryResponse extends ResponseModel(String) {}
