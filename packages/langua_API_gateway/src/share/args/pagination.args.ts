import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int)
  page:number = 0;

  @Field((type) => Int)
  limit:number = 10;
}
