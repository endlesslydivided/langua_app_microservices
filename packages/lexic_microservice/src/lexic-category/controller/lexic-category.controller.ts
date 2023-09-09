import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { lexic, LEXIC_SERVICE_NAME } from 'src/lexic.pb';

import {
  CreateLexicCategoryRequestDto,
  FindManyLexicCategoriesByCreatorIdRequestDto,
  FindManyLexicCategoriesRequestDto,
} from '../dto/lexic-category.dto';
import { LexicCategoryService } from '../service/lexic-category.service';

@Controller()
export class LexicCategoryController {

  constructor(private service: LexicCategoryService){
    
  }


  @GrpcMethod(LEXIC_SERVICE_NAME, 'createLexicCategory')
  private createLexicCategory(
    payload: CreateLexicCategoryRequestDto,
  ): Promise<lexic.CreateLexicCategoryResponse> {
    return this.service.create(payload);
  }

  @GrpcMethod(LEXIC_SERVICE_NAME, 'findManyLexicCategoriesByCreatorId')
  private findManyLexicCategoriesByCreatorId(
    payload: FindManyLexicCategoriesByCreatorIdRequestDto,
  ): Promise<lexic.FindManyLexicCategoriesByCreatorIdResponse> {
    return this.service.findManyAndCountByCreatorId(payload);
  }

  @GrpcMethod(LEXIC_SERVICE_NAME, 'findManyLexicCategories')
  private findManyLexicCategories(
    payload: FindManyLexicCategoriesRequestDto,
  ): Promise<lexic.FindManyLexicCategoriesResponse> {
    return this.service.findManyAndCount(payload);
  }
}
