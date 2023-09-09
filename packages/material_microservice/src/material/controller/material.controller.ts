import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { material, MATERIAL_SERVICE_NAME } from '../../material.pb';
import {
  CreateMaterialRequestDto,
  CreateMaterialToVocabularyRequestDto,
  DeleteMaterialToVocabularyRequestDto,
  FindManyMaterialsByCreatorIdRequestDto,
  FindManyMaterialsByVocabularyIdRequestDto,
  FindOneMaterialRequestByIdDto,
  UpdateMaterialToVocabularyRequestDto,
} from '../dto/material.dto';
import { MaterialService } from '../service/material.service';

@Controller()
export class MaterialController {

  constructor(private materialService: MaterialService){
    
  }


  @GrpcMethod(MATERIAL_SERVICE_NAME, 'CreateMaterial')
  private createMaterial(
    payload: CreateMaterialRequestDto,
  ): Promise<material.CreateMaterialResponse> {
    return this.materialService.createMaterial(payload);
  }

  @GrpcMethod(MATERIAL_SERVICE_NAME, 'FindOneMaterialById')
  private FindOneMaterialById(
    payload: FindOneMaterialRequestByIdDto,
  ): Promise<material.FindOneMaterialByIdResponse> {
    return this.materialService.findOneMaterialById(payload);
  }

  @GrpcMethod(MATERIAL_SERVICE_NAME, 'FindManyMaterialsByVocabularyId')
  private findManyMaterialsByVocabularyId(
    payload: FindManyMaterialsByVocabularyIdRequestDto,
  ): Promise<material.FindManyMaterialsByVocabularyIdResponse> {
    return this.materialService.findManyMaterialsByVocabularyId(payload);
  }

  @GrpcMethod(MATERIAL_SERVICE_NAME, 'FindManyMaterialsByCreatorId')
  private findManyMaterialsByCreatorId(
    payload: FindManyMaterialsByCreatorIdRequestDto,
  ): Promise<material.FindManyMaterialsByCreatorIdResponse> {
    return this.materialService.findManyMaterialsByCreatorId(payload);
  }

  @GrpcMethod(MATERIAL_SERVICE_NAME, 'CreateMaterialToVocabulary')
  private createMaterialToVocabulary(
    payload: CreateMaterialToVocabularyRequestDto,
  ): Promise<material.CreateMaterialToVocabularyResponse> {
    return this.materialService.createMaterialToVocabulary(payload);
  }

  @GrpcMethod(MATERIAL_SERVICE_NAME, 'UpdateMaterialToVocabulary')
  private updateMaterialToVocabulary(
    payload: UpdateMaterialToVocabularyRequestDto,
  ): Promise<material.UpdateMaterialToVocabularyResponse> {
    return this.materialService.updateMaterialToVocabulary(payload);
  }

  @GrpcMethod(MATERIAL_SERVICE_NAME, 'DeleteMaterialToVocabulary')
  private deleteMaterialToVocabulary(
    payload: DeleteMaterialToVocabularyRequestDto,
  ): Promise<material.DeleteMaterialToVocabularyResponse> {
    return this.materialService.deleteMaterialToVocabulary(payload);
  }
}
