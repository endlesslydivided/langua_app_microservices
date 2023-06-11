import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { material } from 'src/material.pb';

import {
  CreateMaterialRequestDto,
  CreateMaterialToVocabularyRequestDto,
  DeleteMaterialToVocabularyRequestDto,
  FindManyMaterialsByCreatorIdRequestDto,
  FindManyMaterialsByVocabularyIdRequestDto,
  FindOneMaterialRequestByIdDto,
  UpdateMaterialToVocabularyRequestDto,
} from '../dto/material.dto';
import { MaterialRepository } from '../repository/material.repository';
import { MaterialToVocabularyRepository } from '../repository/material-to-vocabulary.repository';

@Injectable()
export class MaterialService {
  @Inject(MaterialRepository)
  private readonly materialRepository: MaterialRepository;

  @Inject(MaterialToVocabularyRepository)
  private readonly materialToVocabularyRepository: MaterialToVocabularyRepository;

  public async createMaterial(
    dto: CreateMaterialRequestDto,
  ): Promise<material.CreateMaterialResponse> {
    const material = await this.materialRepository.create(dto);
    return {
      status: HttpStatus.OK,
      error: null,
      id: material.id,
    };
  }

  public async findOneMaterialById(
    dto: FindOneMaterialRequestByIdDto,
  ): Promise<material.FindOneMaterialByIdResponse> {
    const material = await this.materialRepository.findOneById(dto.id);
    return {
      status: HttpStatus.OK,
      error: null,
      material,
    };
  }

  public async findManyMaterialsByVocabularyId(
    dto: FindManyMaterialsByVocabularyIdRequestDto,
  ): Promise<material.FindManyMaterialsByVocabularyIdResponse> {
    const data = await this.materialRepository.findManyAndCountByVocabularyId(
      dto.vocabularyId,
      dto.pageFilters,
    );
    return {
      status: HttpStatus.OK,
      error: null,
      data: {
        rows: data[0],
        count: data[1],
      },
    };
  }

  public async findManyMaterialsByCreatorId(
    dto: FindManyMaterialsByCreatorIdRequestDto,
  ): Promise<material.FindManyMaterialsByCreatorIdResponse> {
    const data = await this.materialRepository.findManyAndCountByCreatorId(
      dto.creatorId,
      dto.pageFilters,
    );
    return {
      status: HttpStatus.OK,
      error: null,
      data: {
        rows: data[0],
        count: data[1],
      },
    };
  }

  public async createMaterialToVocabulary(
    dto: CreateMaterialToVocabularyRequestDto,
  ): Promise<material.CreateMaterialToVocabularyResponse> {
    const materialToVocabulary =
      await this.materialToVocabularyRepository.create(dto);
    return {
      status: HttpStatus.OK,
      error: null,
      id: materialToVocabulary.id,
    };
  }

  public async updateMaterialToVocabulary(
    dto: UpdateMaterialToVocabularyRequestDto,
  ): Promise<material.UpdateMaterialToVocabularyResponse> {
    const materialToVocabulary =
      await this.materialToVocabularyRepository.findOneById(dto.id);

    if (!materialToVocabulary) {
      return {
        status: HttpStatus.NOT_FOUND,
        error: ['Vocabulary material is not found'],
      };
    }

    await this.materialToVocabularyRepository.updateMaterialToVocabulary(
      materialToVocabulary,
      dto.isFinished,
    );

    return {
      status: HttpStatus.NO_CONTENT,
      error: null,
    };
  }

  public async deleteMaterialToVocabulary(
    dto: DeleteMaterialToVocabularyRequestDto,
  ): Promise<material.DeleteMaterialToVocabularyResponse> {
    await this.materialToVocabularyRepository.deleteOne(dto.id);
    return {
      status: HttpStatus.NO_CONTENT,
      error: null,
    };
  }
}
