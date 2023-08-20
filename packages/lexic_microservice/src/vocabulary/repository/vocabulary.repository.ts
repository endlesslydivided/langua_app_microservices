import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PageFilters } from '../../share/types/common.types';
import { CreateVocabularyRequestDto } from '../dto/vocabulary.dto';
import { Vocabulary, VocabularyDocument } from '../schema/vocabulary.schema';

@Injectable()
export class VocabularyRepository {

  constructor( @InjectModel(Vocabulary.name) private vocabularyModel: Model<Vocabulary>){
    
  }


  async create(dto: CreateVocabularyRequestDto): Promise<VocabularyDocument> {
    const vocabulary = new this.vocabularyModel(dto);
    return vocabulary.save();
  }

  async findOneById(id: string): Promise<VocabularyDocument> {
    return await this.vocabularyModel.findById(id).exec();
  }

  async findManyAndCountByUserId(
    userId: string,
    filters: PageFilters,
  ): Promise<[VocabularyDocument[], number]> {
    const clause = { userId };

    const vocabularies = await this.vocabularyModel
      .find(
        clause,
        {},
        {
          skip: filters.limit * filters.page,
          limit: filters.limit,
        },
      )
      .exec();

    const count = await this.vocabularyModel.count(clause).exec();

    return [vocabularies, count];
  }
}
