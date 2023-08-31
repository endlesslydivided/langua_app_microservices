import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { CreateWordToVocabularyRequestDto } from '../dto/word.dto';
import {
  WordToVocabulary,
  WordToVocabularyDocument,
} from '../schema/word-to-vocabulary.schema';

@Injectable()
export class WordToVocabularyRepository {


  constructor(@InjectModel(WordToVocabulary.name) private wordToVocabularyModel: Model<WordToVocabulary>){
    
  }


  async createWordToVocabulary(
    dto: CreateWordToVocabularyRequestDto,
  ): Promise<WordToVocabularyDocument> {
    const wordToVocabularyModel = new this.wordToVocabularyModel(dto);
    return wordToVocabularyModel.save();
  }

  async updateWordToVocabulary(
    wordToVocabulary: WordToVocabularyDocument,
    isFinished: boolean
  ): Promise<WordToVocabularyDocument> {
    return wordToVocabulary
      .updateOne({
        $set: {
          isFinished,
        },
      })
      .exec();
  }

  async findOneById(id: string): Promise<WordToVocabularyDocument> {
    return await this.wordToVocabularyModel.findById(id).exec();
  }

  async findOneByFields(vocabularyId: string,wordId:String): Promise<WordToVocabularyDocument> {
    return await this.wordToVocabularyModel.findOne({wordId,vocabularyId}).exec();
  }
}
