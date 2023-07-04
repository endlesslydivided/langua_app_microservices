import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { lexic, LEXIC_SERVICE_NAME } from '../../langua_proto/lexic.pb';

@Injectable()
export class LexicCategoryService {
  private lexicServiceClient: lexic.LexicService;

  @Inject(LEXIC_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.lexicServiceClient =
      this.client.getService<lexic.LexicService>(LEXIC_SERVICE_NAME);
  }

  public async createLexicCategory(
    data: lexic.CreateLexicCategoryRequest,
  ): Promise<lexic.CreateLexicCategoryResponse> {
    return firstValueFrom(this.lexicServiceClient.createLexicCategory(data));
  }

 
  public async findManyLexicCategoriesByCreatorId(
    data: lexic.FindManyLexicCategoriesByCreatorIdRequest,
  ): Promise<lexic.FindManyLexicCategoriesByCreatorIdResponse> {
    return firstValueFrom(
      this.lexicServiceClient.findManyLexicCategoriesByCreatorId(data),
    );
  }


}
