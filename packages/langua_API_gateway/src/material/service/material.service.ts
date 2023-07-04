import { Body, Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { material, MATERIAL_SERVICE_NAME } from '../../langua_proto/material.pb';

@Injectable()
export class MaterialService {
  private materialServiceClient: material.MaterialService;

  @Inject(MATERIAL_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.materialServiceClient =
      this.client.getService<material.MaterialService>(MATERIAL_SERVICE_NAME);
  }

  public async createMaterial(
    data: material.CreateMaterialRequest,
  ): Promise<material.CreateMaterialResponse> {
    return firstValueFrom(this.materialServiceClient.createMaterial(data));
  }

  public async findOneMaterialById(
    data: material.FindOneMaterialByIdRequest,
  ): Promise<material.FindOneMaterialByIdResponse> {
    return firstValueFrom(this.materialServiceClient.findOneMaterialById(data));
  }

  public async findManyMaterialsByVocabularyId(
    data: material.FindManyMaterialsByVocabularyIdRequest,
  ): Promise<material.FindManyMaterialsByVocabularyIdResponse> {
    return firstValueFrom(
      this.materialServiceClient.findManyMaterialsByVocabularyId(data),
    );
  }

  public async findManyMaterialsByCreatorId(
    data: material.FindManyMaterialsByCreatorIdRequest,
  ): Promise<material.FindManyMaterialsByCreatorIdResponse> {
    return firstValueFrom(
      this.materialServiceClient.findManyMaterialsByCreatorId(data),
    );
  }

  public async createMaterialToVocabulary(
    data: material.CreateMaterialToVocabularyRequest,
  ): Promise<material.CreateMaterialToVocabularyResponse> {
    return firstValueFrom(this.materialServiceClient.createMaterialToVocabulary(data));
  }

  public async updateMaterialToVocabulary(
    data: material.UpdateMaterialToVocabularyRequest,
  ): Promise<material.UpdateMaterialToVocabularyResponse> {
    return firstValueFrom(this.materialServiceClient.updateMaterialToVocabulary(data));
  }

  public async deleteMaterialToVocabulary(
    data: material.DeleteMaterialToVocabularyRequest,
  ): Promise<material.DeleteMaterialToVocabularyResponse> {
    return firstValueFrom(this.materialServiceClient.deleteMaterialToVocabulary(data));
  }
}
