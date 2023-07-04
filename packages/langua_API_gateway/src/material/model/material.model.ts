import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

import { IdentifiedModel } from '../../share/model/identified.model';
import { PaginatedModel } from '../../share/model/paginated.model';

@ObjectType()
export class Material extends IdentifiedModel {

  @Field((type) => GraphQLString, { nullable: true })
  creatorUserId: string;

  @Field((type) => GraphQLString, { nullable: true })
  name: string;

  @Field((type) => GraphQLString, { nullable: true })
  language: string;

  @Field((type) => GraphQLString, { nullable: true })
  textContent: string;

}

@ObjectType()
export class PaginatedMaterial extends PaginatedModel<Material>(Material) {}

