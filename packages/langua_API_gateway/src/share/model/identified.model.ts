import { Field, GraphQLTimestamp, ID, InterfaceType, ObjectType } from '@nestjs/graphql';

import { Timestamps } from './timestamps.model';

@ObjectType()
export class IdentifiedModel extends Timestamps {
  @Field((type) => ID,{nullable:true})
  id: string;
}
