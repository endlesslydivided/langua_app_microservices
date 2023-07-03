import { BadRequestException, HttpStatus, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { GraphQLString } from "graphql";
import { AuthGuard } from "../../auth/guard/auth.guard";
import { FindManyMaterialsByCreatorIdArgs, FindManyMaterialsByVocabularyIdArgs } from "../args/material.args";
import { CreateMaterialInput } from "../inputs/material.inputs";
import { Material, PaginatedMaterial } from "../model/material.model";
import { MaterialService } from "../service/material.service";
import { Void } from '../../share/scalar/void.scalar';


@Resolver((of) => Material)
export class MaterialResolver {
  constructor(private materialService: MaterialService) {}

  @Mutation((returns) => String,{name:'createMaterial'})
  @UseGuards(AuthGuard)
  async createMaterial(@Args('createMaterial') input: CreateMaterialInput) {
    const result = await this.materialService.createMaterial(input);
    
    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }
    
    return result.id;
  }

  @Query((returns) => Material,{name:'findOneMaterialById'})
  @UseGuards(AuthGuard)
  async findOneMaterialById(@Args('id', { type: () => GraphQLString }) id: string) {
    const result = await this.materialService.findOneMaterialById({ id });

    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.material;

  }

  @Query((type) => PaginatedMaterial, { name: `findManyMaterialsByVocabularyId` })
  @UseGuards(AuthGuard)
  async findManyMaterialsByVocabularyId(@Args() args: FindManyMaterialsByVocabularyIdArgs) {
    const { vocabularyId, page, limit } = args;
    const data = {
      vocabularyId,
      pageFilters: {
        page,
        limit,
      },
    };
    const result =  await this.materialService.findManyMaterialsByVocabularyId(data);

    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.data;
  }

  @Query((type) => PaginatedMaterial, { name: `findManyMaterialsByCreatorId` })
  async findManyMaterialsByCreatorId(
    @Args() args: FindManyMaterialsByCreatorIdArgs,
  ) {
    const { creatorId, page, limit } = args;
    const data = {
      creatorId,
      pageFilters: {
        page,
        limit,
      },
    };
    const result = await this.materialService.findManyMaterialsByCreatorId(data);

    if(result.status !== HttpStatus.OK)
    {
      throw new BadRequestException(result.error)
    }

    return result.data;
  }
}
