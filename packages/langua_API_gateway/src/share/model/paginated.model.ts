import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export interface IPaginatedType<T> {
  count: number;
  rows: T[];
}

export function PaginatedModel<T>(typeRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field((type) => Int,{nullable:true})
    count: number;

    @Field((type) => [typeRef],{nullable:true})
    rows: T[];
  }

  return PaginatedType as Type<IPaginatedType<T>>;
}
