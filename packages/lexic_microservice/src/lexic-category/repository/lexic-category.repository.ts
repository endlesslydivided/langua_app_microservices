import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PageFilters } from '../../share/types/common.types';
import { CreateLexicCategoryRequestDto } from '../dto/lexic-category.dto';
import {
  LexicCategory,
  LexicCategoryDocument,
} from '../schema/lexic-category.schema';

@Injectable()
export class LexicCategoryRepository {

  constructor(@InjectModel(LexicCategory.name) private lexicCategoryModel: Model<LexicCategory>){
    
  }


  async create(
    dto: CreateLexicCategoryRequestDto,
  ): Promise<LexicCategoryDocument> {
    const lexicCategory = new this.lexicCategoryModel(dto);
    return lexicCategory.save();
  }

  async findOneByName(
    categoryName:string,
  ): Promise<LexicCategoryDocument> {
    const lexicCategory = this.lexicCategoryModel.findOne({categoryName});
    return lexicCategory;
  }

  async findManyAndCountByCreatorId(
    creatorUserId: string,
    language: string,
    nativeCategoryLanguage: string,
    filters: PageFilters,
  ): Promise<[LexicCategoryDocument[], number]> {
    const clause = { creatorUserId,nativeCategoryLanguage,language };

    const lexicCategories = await this.lexicCategoryModel
      .find(
        clause,
        {},
        {
          skip: filters.limit * filters.page,
          limit: filters.limit,
        },
      )
      .exec();

    const count = await this.lexicCategoryModel.count(clause).exec();

    return [lexicCategories, count];
  }

  async findManyAndCount(
    language: string,
    nativeCategoryLanguage: string,
    filters: PageFilters,
  ): Promise<[LexicCategoryDocument[], number]> {

    const clause = { nativeCategoryLanguage,language };


    const lexicCategories = await this.lexicCategoryModel
      .find(
        clause,{},
        {
          skip: filters.limit * filters.page,
          limit: filters.limit,
        },
      )
      .exec();

    const count = await this.lexicCategoryModel.count(clause).exec();

    return [lexicCategories, count];
  }
}
