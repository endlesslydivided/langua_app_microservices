import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongodb';
import mongoose, { Model } from 'mongoose';

import { CreateMaterialToVocabularyRequestDto } from '../dto/material.dto';
import {
  MaterialToVocabulary,
  MaterialToVocabularyDocument,
} from '../schema/material-to-vocabulary.schema';

@Injectable()
export class MaterialToVocabularyRepository {

  constructor( @InjectModel(MaterialToVocabulary.name) private materialToVocabularyModel: Model<MaterialToVocabulary>){
    
  }


  async create(
    dto: CreateMaterialToVocabularyRequestDto
  ): Promise<MaterialToVocabularyDocument> {
    const materialToVocabulary = new this.materialToVocabularyModel(dto);
    return materialToVocabulary.save();
  }

  async findOneById(id: string): Promise<MaterialToVocabularyDocument> {
    return await this.materialToVocabularyModel.findById(id).exec();
  }

  async updateMaterialToVocabulary(
    materialToVocabulary: MaterialToVocabularyDocument,
    isFinished: boolean
  ): Promise<MaterialToVocabularyDocument> {
    return materialToVocabulary
      .updateOne({
        $set: {
          isFinished,
        },
      })
      .exec();
  }

  async deleteOne(id: string): Promise<DeleteResult> {
    return this.materialToVocabularyModel.deleteOne({ _id: id });
  }
}
