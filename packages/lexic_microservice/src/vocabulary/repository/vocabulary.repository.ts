import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PageFilters } from '../../share/types/common.types';
import { CreateVocabularyRequestDto } from '../dto/vocabulary.dto';
import { Vocabulary, VocabularyDocument } from '../schema/vocabulary.schema';

@Injectable()
export class VocabularyRepository {

  constructor(@InjectModel(Vocabulary.name) private vocabularyModel: Model<Vocabulary>){
    
  }


  async create(dto: CreateVocabularyRequestDto): Promise<VocabularyDocument> {

    let vocabulary = await this.vocabularyModel.findOne({userId:dto.userId,language:dto.language,vocabularyNativeLanguage:dto.vocabularyNativeLanguage});

    if(vocabulary)
    {
      return vocabulary;
    }

    let newVocabulary = new this.vocabularyModel(dto);
    return newVocabulary.save();
  }

  async findOneById(id: string): Promise<VocabularyDocument> {
    return await this.vocabularyModel.findById(id).exec();
  }

  async findManyAndCountByUserId(
    userId: string,
    filters: PageFilters,
  ): Promise<[VocabularyDocument[], number]> {

    const vocabularies = (await this.vocabularyModel
      .aggregate([
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
        {
          $match: {
            'userId': userId,
          },
        },
        {
          $facet: {
            metadata: [{ $count: 'count' }],
            data: [
              { $skip: filters.limit * filters.page },
              { $limit: filters.limit },
              {
                $project: {
                  id:true,
                  userId:true,
                  language:true,
                  vocabularyNativeLanguage: true,
                  createdAt:true,
                  updatedAt:true,
                },
              },
            ],
          },
        },
      ])
      .exec()) as unknown as {
      data: VocabularyDocument[];
      metadata: { count: number; page: number };
    }[];


    return [vocabularies[0]?.data, vocabularies[0].metadata[0]?.count];
  }
}
