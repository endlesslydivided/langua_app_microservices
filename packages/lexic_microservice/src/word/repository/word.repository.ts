import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { PageFilters } from '../../share/types/common.types';
import { CreateWordRequestDto } from '../dto/word.dto';
import { Word, WordDocument } from '../schema/word.schema';

const wordWithLexicCategoryProject = {
  $project: {
    id: '$_id',
    word: true,
    lexicCategories: {
      $map: {
        input: '$lexicCategories',
        as: 'cat',
        in: {
          id: '$$cat._id',
          categoryName: '$$cat.categoryName',
          creatorUserId: '$$cat.creatorUserId',
        },
      },
    },
    language: true,
    transcription: true,
    createdAt:true,
    updatedAt:true,
    wordsToVocabularies:{
      $map: {
        input: '$wordToVocabularies',
        as: 'wtv',
        in: {
          id: '$$wtv._id',
          wordId: '$$wtv.wordId',
          vocabularyId: '$$wtv.vocabularyId',
        },
      },
    }
  },
};
const wordWithLexicCategoryLookup = {
  $lookup: {
    from: 'lexic_categories',
    localField: 'lexicCategories',
    foreignField: '_id',
    as: 'lexicCategories',
  },
};

@Injectable()
export class WordRepository {
  @InjectModel(Word.name)
  private wordModel: Model<Word>;

  async create(dto: CreateWordRequestDto): Promise<WordDocument> {
    const word = new this.wordModel({
      ...dto,
      lexicCategories: [dto.lexicCategoryId],
    });
    return word.save();
  }

  async findManyAndCountByVocabularyId(
    vocabularyId: string,
    filters: PageFilters,
  ): Promise<[WordDocument[], number]> {
    const words = (await this.wordModel
      .aggregate([
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
        {
          $lookup: {
            from: 'words_to_vocabularies',
            localField: 'id',
            foreignField: 'wordId',
            as: 'wordsToVocabularies',
          },
        },
        {
          $match: {
            'wordsToVocabularies.vocabularyId': vocabularyId,
          },
        },
        wordWithLexicCategoryLookup,
        {
          $facet: {
            metadata: [{ $count: 'count' }],
            data: [
              { $skip: filters.limit * filters.page },
              { $limit: filters.limit },
              {
                $project: {
                  id: true,
                  word: true,
                  lexicCategories: {
                    $map: {
                      input: '$lexicCategories',
                      as: 'cat',
                      in: {
                        id: '$$cat._id',
                        categoryName: '$$cat.categoryName',
                        creatorUserId: '$$cat.creatorUserId',
                      },
                    },
                  },
                  wordToVocabulary: {
                    $map: {
                      input: '$wordsToVocabularies',
                      as: 'wtv',
                      in: {
                        id: '$$wtv._id',
                        vocabularyId: '$$wtv.vocabularyId',
                        wordId: '$$wtv.wordId',
                      },
                    },
                  },
                  language: true,
                  createdAt:true,
                  updatedAt:true,
                  transcription: true,
                },
              },
            ],
          },
        },
      ])
      .exec()) as unknown as {
      data: WordDocument[];
      metadata: { count: number; page: number };
    }[];

    return [words[0]?.data, words[0].metadata[0]?.count];
  }

  async findManyAndCountByLexicCategoryId(
    lexicCategoryId: string,
    filters: PageFilters,
  ): Promise<[WordDocument[], number]> {
    const words = (await this.wordModel
      .aggregate([
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
        {
          $match: {
            lexicCategories: new mongoose.Types.ObjectId(lexicCategoryId),
          },
        },
        wordWithLexicCategoryLookup,
        {
          $lookup: {
            from: 'words_to_vocabularies',
            localField: 'id',
            foreignField: 'wordId',
            as: 'wordsToVocabularies',
          },
        },
        {
          $facet: {
            metadata: [{ $count: 'count' }],
            data: [
              { $skip: filters.limit * filters.page },
              { $limit: filters.limit },
              wordWithLexicCategoryProject,
            ],
          },
        },
      ])
      .exec()) as unknown as {
      data: WordDocument[];
      metadata: { count: number; page: number };
    }[];

    return [words[0]?.data, words[0].metadata[0]?.count];
  }

  async findOneById(id: string): Promise<WordDocument> {
    const word = await this.wordModel
      .aggregate([
        wordWithLexicCategoryLookup,
        {
          $match: {
            _id: new mongoose.Types.ObjectId(id),
          },
        },
        wordWithLexicCategoryProject,
      ])
      .exec();

    return word[0];
  }
}
