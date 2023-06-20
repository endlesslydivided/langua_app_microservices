import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PageFilters } from '../../share/types/common.types';
import { CreateMaterialRequestDto } from '../dto/material.dto';
import { Material, MaterialDocument } from '../schema/material.schema';

@Injectable()
export class MaterialRepository {
  @InjectModel(Material.name)
  private materialModel: Model<Material>;

  async create(dto: CreateMaterialRequestDto): Promise<MaterialDocument> {
    const material = new this.materialModel(dto);
    return material.save();
  }

  async findOneById(id: string): Promise<MaterialDocument> {
    return await this.materialModel.findById(id).exec();
  }

  async findManyAndCountByVocabularyId(
    vocabularyId: string,
    filters: PageFilters,
  ): Promise<[MaterialDocument[], number]> {
    const materials = await this.materialModel
      .aggregate([
        {
          $addFields: {
            id: { $toString: '$_id' },
          },
        },
        {
          $lookup: {
            from: 'materials_to_vocabularies',
            localField: 'id',
            foreignField: 'materialId',
            as: 'materialsToVocabularies',
          },
        },
        {
          $match: {
            'materialsToVocabularies.vocabularyId': vocabularyId,
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
                  id: true,
                  creatorUserId: true,
                  textContent: true,
                  name: true,
                  language: true,
                  materialToVocabulary: {
                    $map: {
                      input: '$materialsToVocabularies',
                      as: 'mtv',
                      in: {
                        id: '$$mtv._id',
                        vocabularyId: '$$mtv.vocabularyId',
                        materialId: '$$mtv.materialId',
                        isFinished: '$$mtv.isFinished',
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      ])
      .exec() as unknown as {
      data: MaterialDocument[];
      metadata: { count: number; page: number };
    }[];

    return [materials[0]?.data, materials[0].metadata[0]?.count];
  }

  async findManyAndCountByCreatorId(
    creatorUserId: string,
    filters: PageFilters,
  ): Promise<[MaterialDocument[], number]> {
    const clause = { creatorUserId };

    const materials = await this.materialModel
      .find(
        clause,
        {},
        {
          skip: filters.limit * filters.page,
          limit: filters.limit,
        },
      )
      .exec();

    const count = await this.materialModel.count(clause).exec();

    return [materials, count];
  }
}
