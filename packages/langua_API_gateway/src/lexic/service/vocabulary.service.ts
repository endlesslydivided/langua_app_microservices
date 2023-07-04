import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { lexic, LEXIC_SERVICE_NAME } from '../../langua_proto/lexic.pb';

@Injectable()
export class VocabularyService {
  private lexicServiceClient: lexic.LexicService;

  @Inject(LEXIC_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.lexicServiceClient =
      this.client.getService<lexic.LexicService>(LEXIC_SERVICE_NAME);
  }

  public async createVocabulary(
    data: lexic.CreateVocabularyRequest,
  ): Promise<lexic.CreateVocabularyResponse> {
    return firstValueFrom(this.lexicServiceClient.createVocabulary(data));
  }

 
  public async findManyVocabulariesByUserId(
    data: lexic.FindManyVocabulariesByUserIdRequest,
  ): Promise<lexic.FindManyVocabulariesByUserIdResponse> {
    return firstValueFrom(
      this.lexicServiceClient.findManyVocabulariesByUserId(data),
    );
  }


}
