import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PageFilters } from '../../share/types/common.types';
import { CreateOrUpdateVocabularyStatsRequestDto } from '../dto/vocabulary-stats.dto';
import {
  VocabularyStats,
  VocabularyStatsDocument,
} from '../schema/vocabulary-stats.schema';

@Injectable()
export class VocabularyStatsRepository {
  

  constructor(@InjectModel(VocabularyStats.name) private vocabularyStatsModel: Model<VocabularyStats>
  ){}

  async create(
    dto: CreateOrUpdateVocabularyStatsRequestDto,
  ): Promise<VocabularyStatsDocument> {
    const vocabularyStats = new this.vocabularyStatsModel({
      ...dto,
    });
    return vocabularyStats.save();
  }

  async save(
    vocabularyStats: VocabularyStatsDocument,
  ): Promise<VocabularyStatsDocument> {
    return vocabularyStats.save();
  }

  async findOneById(id: string): Promise<VocabularyStatsDocument> {
    const vocabularyStats = await this.vocabularyStatsModel.findById(id).exec();

    return vocabularyStats;
  }

  async findOneByTodayCreatedAt(
    userId: string,
  ): Promise<VocabularyStatsDocument> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const vocabularyStats = await this.vocabularyStatsModel
      .findOne({
        createdAt: {
          $gte: start,
          $lt: end,
        },
        userId,
      })
      .exec();

    return vocabularyStats;
  }

  async findManyAndCountByUserId(
    userId: string,
    filters: PageFilters,
  ): Promise<[VocabularyStatsDocument[], number]> {
    const clause = { userId };

    const vocabularyStats = await this.vocabularyStatsModel
      .find(
        clause,
        {},
        {
          skip: filters.limit * filters.page,
          limit: filters.limit,
        },
      )
      .exec();

    const count = await this.vocabularyStatsModel.count(clause).exec();

    return [vocabularyStats, count];
  }

  async getOverallVocabularyStats(
    userId: string,
  ): Promise<VocabularyStatsDocument> {
    const overallVocabularyStats = (await this.vocabularyStatsModel
      .aggregate([
        {
          $match: {
            userId,
          },
        },
        {
          $facet: {
            totalStartedMaterials: [
              {
                $group: {
                  _id: '$userId',
                  totalAmount: { $sum: '$startedMaterialsCount' },
                  count: { $sum: 1 },
                },
              },
            ],
            totalLearnedMaterials: [
              {
                $group: {
                  _id: '$userId',
                  totalAmount: { $sum: '$learnedMaterialsCount' },
                  count: { $sum: 1 },
                },
              },
            ],
            totalStartedWords: [
              {
                $group: {
                  _id: '$userId',
                  totalAmount: { $sum: '$startedWordsCount' },
                  count: { $sum: 1 },
                },
              },
            ],
            totalLearnedWords: [
              {
                $group: {
                  _id: '$userId',
                  totalAmount: { $sum: '$learnedWordsCount' },
                  count: { $sum: 1 },
                },
              },
            ],
          },
        },
        {
          $project: {
            userId: {
              $reduce: {
                input: '$totalStartedMaterials._id',
                initialValue: '',
                in: {
                  $concat: ['$$this', ''],
                },
              },
            },
            totalStartedMaterials: {
              $reduce: {
                input: '$totalStartedMaterials.totalAmount',
                initialValue: 0,
                in: {
                  $add: ['$$value', '$$this'],
                },
              },
            },
            totalLearnedMaterials: {
              $reduce: {
                input: '$totalLearnedMaterials.totalAmount',
                initialValue: 0,
                in: {
                  $add: ['$$value', '$$this'],
                },
              },
            },
            totalStartedWords: {
              $reduce: {
                input: '$totalStartedWords.totalAmount',
                initialValue: 0,
                in: {
                  $add: ['$$value', '$$this'],
                },
              },
            },
            totalLearnedWords: {
              $reduce: {
                input: '$totalLearnedMaterials.totalAmount',
                initialValue: 0,
                in: {
                  $add: ['$$value', '$$this'],
                },
              },
            },
            dayCount: {
              $reduce: {
                input: '$totalLearnedMaterials.count',
                initialValue: 0,
                in: {
                  $add: ['$$value', '$$this'],
                },
              },
            },
          },
        },
      ])
      .exec()) as unknown as VocabularyStatsDocument[];

    return overallVocabularyStats[0];
  }
}
