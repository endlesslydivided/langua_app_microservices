import { Body, Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { lexic, LEXIC_SERVICE_NAME } from '../../langua_proto/lexic.pb';

@Injectable()
export class WordService {
  private lexicServiceClient: lexic.LexicService;

  @Inject(LEXIC_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.lexicServiceClient =
      this.client.getService<lexic.LexicService>(LEXIC_SERVICE_NAME);
  }

  public async createWord(
    data: lexic.CreateWordRequest,
  ): Promise<lexic.CreateWordResponse> {
    return firstValueFrom(this.lexicServiceClient.createWord(data));
  }

  public async findOneWordById(
    data: lexic.FindOneWordByIdRequest,
  ): Promise<lexic.FindOneWordByIdResponse> {
    return firstValueFrom(this.lexicServiceClient.findOneWordById(data));
  }

  public async findManyWordsByVocabularyId(
    data: lexic.FindManyWordsByVocabularyIdRequest,
  ): Promise<lexic.FindManyWordsByVocabularyIdResponse> {
    return firstValueFrom(
      this.lexicServiceClient.findManyWordsByVocabularyId(data),
    );
  }

  public async findManyWordsByLexicCategoryId(
    data: lexic.FindManyWordsByLexicCategoryIdRequest,
  ): Promise<lexic.FindManyWordsByLexicCategoryIdResponse> {
    return firstValueFrom(
      this.lexicServiceClient.findManyWordsByLexicCategoryId(data),
    );
  }

  public async createWordToVocabulary(
    data: lexic.CreateWordToVocabularyRequest,
  ): Promise<lexic.CreateWordToVocabularyResponse> {
    return firstValueFrom(this.lexicServiceClient.createWordToVocabulary(data));
  }

  public async updateWordToVocabulary(
    data: lexic.UpdateWordToVocabularyRequest,
  ): Promise<lexic.UpdateWordToVocabularyResponse> {
    return firstValueFrom(this.lexicServiceClient.updateWordToVocabulary(data));
  }
}
