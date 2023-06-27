import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

import { IdentifiedModel } from '../../share/model/identified.model';
import { PaginatedModel } from '../../share/model/paginated.model';
import { ResponseModel } from '../../share/model/status.model';

@ObjectType()
export class Material extends IdentifiedModel {

  @Field((type) => GraphQLString, { nullable: false })
  creatorUserId: string;

  @Field((type) => GraphQLString, { nullable: false })
  name: string;

  @Field((type) => GraphQLString, { nullable: false })
  language: string;

  @Field((type) => GraphQLString, { nullable: false })
  textContent: string;

}

@ObjectType()
export class PaginatedMaterial extends PaginatedModel(Material) {}

@ObjectType()
export class PaginatedMaterialResponse extends ResponseModel(PaginatedMaterial) {}

@ObjectType()
export class MaterialResponse extends ResponseModel(Material) {}

@ObjectType()
export class ModifyMaterialResponse extends ResponseModel(String) {}
