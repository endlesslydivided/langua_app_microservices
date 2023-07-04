import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WordToVocabularyDocument = HydratedDocument<WordToVocabulary>;

@Schema({ timestamps: true, collection: 'words_to_vocabularies' })
export class WordToVocabulary {
  @Prop()
  wordId: string;

  @Prop()
  vocabularyId: string;

  @Prop()
  isFinished: boolean;
}

export const WordToVocabularySchema =
  SchemaFactory.createForClass(WordToVocabulary);
