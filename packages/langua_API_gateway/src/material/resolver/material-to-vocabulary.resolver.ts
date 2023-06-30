import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateMaterialToVocabularyInput, UpdateMaterialToVocabularyInput } from '../inputs/material-to-vocabulary.inputs';

import { DeleteMaterialToVocabularyResponse, MaterialToVocabulary, ModifyMaterialToVocabularyResponse } from '../model/material-to-vocabulary.model';
import { MaterialService } from '../service/material.service';
import { GraphQLString } from 'graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/guard/auth.guard';

@Resolver((of) => MaterialToVocabulary)
export class MaterialToVocabularyResolver {
  constructor(private materialService: MaterialService) {}

  @Mutation((returns) => ModifyMaterialToVocabularyResponse)
  @UseGuards(AuthGuard)
  async createMaterialToVocabulary(@Args('createMaterialToVocabulary') input: CreateMaterialToVocabularyInput) {
    const result = await this.materialService.createMaterialToVocabulary(input);
    return {
      status: result.status,
      error: result.error,
      data: result.id,
    };
  }

  @Mutation((returns) => ModifyMaterialToVocabularyResponse)
  @UseGuards(AuthGuard)
  async updateMaterialToVocabulary(@Args('updateMaterialToVocabulary') input: UpdateMaterialToVocabularyInput) {
    return this.materialService.updateMaterialToVocabulary(input);
  }

  @Mutation((returns) => DeleteMaterialToVocabularyResponse)
  @UseGuards(AuthGuard)
  async deleteMaterialToVocabulary(@Args('id', { type: () => GraphQLString }) id: string) {
    return this.materialService.deleteMaterialToVocabulary({id});
  }
}
