import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { lexic, LEXIC_SERVICE_NAME } from 'src/lexic.pb';

import {
  CreateWordRequestDto,
  CreateWordToVocabularyRequestDto,
  FindManyWordsByLexicCategoryIdRequestDto,
  FindManyWordsByVocabularyIdRequestDto,
  FindOneWordByIdRequestDto,
  UpdateWordToVocabularyRequestDto,
} from '../dto/word.dto';
import { WordService } from '../service/word.service';

@Controller()
export class WordController {

  constructor(private service: WordService){
    
  }


  @GrpcMethod(LEXIC_SERVICE_NAME, 'createWord')
  private createWord(
    payload: CreateWordRequestDto,
  ): Promise<lexic.CreateWordResponse> {
    return this.service.create(payload);
  }

  @GrpcMethod(LEXIC_SERVICE_NAME, 'findOneWordById')
  private findOneWordById(
    payload: FindOneWordByIdRequestDto,
  ): Promise<lexic.FindOneWordByIdResponse> {

      return this.service.findOneById(payload);

  }

  @GrpcMethod(LEXIC_SERVICE_NAME, 'findManyWordsByVocabularyId')
  private findManyWordsByVocabularyId(
    payload: FindManyWordsByVocabularyIdRequestDto,
  ): Promise<lexic.FindManyWordsByVocabularyIdResponse> {
    return this.service.findManyByVocabularyId(payload);
  }

  @GrpcMethod(LEXIC_SERVICE_NAME, 'findManyWordsByLexicCategoryId')
  private findManyWordsByLexicCategoryId(
    payload: FindManyWordsByLexicCategoryIdRequestDto,
  ): Promise<lexic.FindManyWordsByLexicCategoryIdResponse> {
    return this.service.findManyByLexicCategoryId(payload);
  }

  @GrpcMethod(LEXIC_SERVICE_NAME, 'createWordToVocabulary')
  private createWordToVocabulary(
    payload: CreateWordToVocabularyRequestDto,
  ): Promise<lexic.CreateWordToVocabularyResponse> {
    return this.service.createWordToVocabulary(payload);
  }

  @GrpcMethod(LEXIC_SERVICE_NAME, 'updateWordToVocabulary')
  private updateWordToVocabulary(
    payload: UpdateWordToVocabularyRequestDto,
  ): Promise<lexic.UpdateWordToVocabularyResponse> {
    return this.service.updateWordToVocabulary(payload);
  }
}
