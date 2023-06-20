import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IdentifiedModel } from '../../share/model/identified.model';
import { GraphQLString } from 'graphql';

@ObjectType()
export class LexicCategory extends IdentifiedModel {

  @Field(type => GraphQLString,{ nullable: false })
  name: string;

  @Field(type => GraphQLString,{ nullable: false })
  creatorUserId: string;

}