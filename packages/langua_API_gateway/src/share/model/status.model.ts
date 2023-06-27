import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLString } from 'graphql';

export interface IStatusType<T> {
  error?: string[];
  status?: number;
  data?: T;
}

export function  ResponseModel<T>(typeRef: Type<T>): Type<IStatusType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class StatusType implements IStatusType<T> {
    @Field((type) => [GraphQLString],{nullable:true})
    error?: string[];

    @Field((type) => Int,{nullable:true})
    status?: number;

    @Field((type) => typeRef,{nullable:true})
    data?: T;
  }

  return StatusType as Type<IStatusType<T>>;
}
