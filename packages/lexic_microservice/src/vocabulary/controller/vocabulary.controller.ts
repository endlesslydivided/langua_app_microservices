import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { lexic, LEXIC_SERVICE_NAME } from 'src/lexic.pb';

import {
  CreateVocabularyRequestDto,
  FindManyVocabulariesByUserIdRequestDto,
} from '../dto/vocabulary.dto';
import { VocabularyService } from '../service/vocabulary.service';

@Controller()
export class VocabularyController {


  constructor(private service: VocabularyService){
    
  }


  @GrpcMethod(LEXIC_SERVICE_NAME, 'createVocabulary')
  private createVocabulary(
    payload: CreateVocabularyRequestDto,
  ): Promise<lexic.CreateVocabularyResponse> {
    return this.service.create(payload);
  }

  @GrpcMethod(LEXIC_SERVICE_NAME, 'findManyVocabulariesByUserId')
  private findManyVocabulariesByUserId(
    payload: FindManyVocabulariesByUserIdRequestDto,
  ): Promise<lexic.FindManyVocabulariesByUserIdResponse> {
    return this.service.findManyAndCountByUserId(payload);
  }
}
