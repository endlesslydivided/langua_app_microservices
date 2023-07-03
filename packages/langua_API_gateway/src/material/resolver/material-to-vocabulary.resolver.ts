import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateMaterialToVocabularyInput, UpdateMaterialToVocabularyInput } from '../inputs/material-to-vocabulary.inputs';

import { BadRequestException, HttpStatus, UseGuards } from '@nestjs/common';
import { GraphQLString } from 'graphql';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { MaterialToVocabulary } from '../model/material-to-vocabulary.model';
import { MaterialService } from '../service/material.service';
import { Void } from '../../share/scalar/void.scalar';

@Resolver((of) => MaterialToVocabulary)
export class MaterialToVocabularyResolver {
  constructor(private materialService: MaterialService) {}

  @Mutation((returns) => String)
  @UseGuards(AuthGuard)
  async createMaterialToVocabulary(@Args('createMaterialToVocabulary') input: CreateMaterialToVocabularyInput) {
    const result = await this.materialService.createMaterialToVocabulary(input);
    
    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.id;
  }

  @Mutation((returns) => Void)
  @UseGuards(AuthGuard)
  async updateMaterialToVocabulary(@Args('updateMaterialToVocabulary') input: UpdateMaterialToVocabularyInput) {
    const result = await this.materialService.updateMaterialToVocabulary(input);

    if(result.status !== HttpStatus.NO_CONTENT)
    {
      throw new BadRequestException(result.error)
    }

    return;
  }

  @Mutation((returns) => Void)
  @UseGuards(AuthGuard)
  async deleteMaterialToVocabulary(@Args('id', { type: () => GraphQLString }) id: string) {
    const result = await this.materialService.deleteMaterialToVocabulary({id});

    if(result.status !== HttpStatus.NO_CONTENT)
    {
      throw new BadRequestException(result.error)
    }

    return;
  }
}
