import { Resolver, Mutation, Args, Query} from "@nestjs/graphql";
import { GraphQLString } from "graphql";
import { CreateMaterialInput } from "../inputs/material.inputs";
import { Material, ModifyMaterialResponse, MaterialResponse, PaginatedMaterialResponse } from "../model/material.model";
import { MaterialService } from "../service/material.service";
import { FindManyMaterialsByCreatorIdArgs, FindManyMaterialsByVocabularyIdArgs } from "../args/material.args";


@Resolver((of) => Material)
export class MaterialResolver {
  constructor(private materialService: MaterialService) {}

  @Mutation((returns) => ModifyMaterialResponse,{name:'createMaterial'})
  async createMaterial(@Args('createMaterial') input: CreateMaterialInput) {
    const result = await this.materialService.createMaterial(input);
    
    return {
      status: result.status,
      error: result.error,
      data: result.id,
    };
  }

  @Query((returns) => MaterialResponse,{name:'findOneMaterialById'})
  async findOneMaterialById(@Args('id', { type: () => GraphQLString }) id: string) {
    const result = await this.materialService.findOneMaterialById({ id });
    return {
      status: result.status,
      error: result.error,
      data: result.material,
    };

  }

  @Query((type) => PaginatedMaterialResponse, { name: `findManyByVocabularyId` })
  async findManyByVocabularyId(@Args() args: FindManyMaterialsByVocabularyIdArgs) {
    const { vocabularyId, page, limit } = args;
    const data = {
      vocabularyId,
      pageFilters: {
        page,
        limit,
      },
    };
    return this.materialService.findManyMaterialsByVocabularyId(data);
  }

  @Query((type) => PaginatedMaterialResponse, { name: `findManyMaterialsByLexicCategoryId` })
  async findManyMaterialsByLexicCategoryId(
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
    return this.materialService.findManyMaterialsByCreatorId(data);
  }
}
