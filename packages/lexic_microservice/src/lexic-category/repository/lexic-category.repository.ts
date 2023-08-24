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

  async findManyAndCountByCreatorId(
    creatorUserId: string,
    filters: PageFilters,
  ): Promise<[LexicCategoryDocument[], number]> {
    const clause = { creatorUserId };

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
    filters: PageFilters,
  ): Promise<[LexicCategoryDocument[], number]> {


    const lexicCategories = await this.lexicCategoryModel
      .find(
        {},{},
        {
          skip: filters.limit * filters.page,
          limit: filters.limit,
        },
      )
      .exec();

    const count = await this.lexicCategoryModel.count().exec();

    return [lexicCategories, count];
  }
}
