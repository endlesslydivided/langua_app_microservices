import { Field, GraphQLTimestamp, ID, InterfaceType } from '@nestjs/graphql';

import { Timestamps } from './timestamps.model';

export class IdentifiedModel extends Timestamps {
  @Field((type) => ID)
  id: string;
}
