import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { lexic } from '../../lexic.pb';
import {
  CreateVocabularyRequestDto,
  FindManyVocabulariesByUserIdRequestDto,
} from '../dto/vocabulary.dto';
import { VocabularyRepository } from '../repository/vocabulary.repository';

@Injectable()
export class VocabularyService {


  constructor(private vocabularyRepository: VocabularyRepository){
    
  }


  public async create(
    dto: CreateVocabularyRequestDto,
  ): Promise<lexic.CreateVocabularyResponse> {
    const vocabulary = await this.vocabularyRepository.create(dto);
    return {
      status: HttpStatus.OK,
      error: null,
      id: vocabulary.id,
    };
  }

  public async findManyAndCountByUserId(
    dto: FindManyVocabulariesByUserIdRequestDto,
  ): Promise<lexic.FindManyVocabulariesByUserIdResponse> {
    const data = await this.vocabularyRepository.findManyAndCountByUserId(
      dto.userId,
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
}
