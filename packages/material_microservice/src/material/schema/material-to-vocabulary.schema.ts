import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MaterialToVocabularyDocument =
  HydratedDocument<MaterialToVocabulary>;

@Schema({ timestamps: true, collection: 'materials_to_vocabularies' })
export class MaterialToVocabulary {
  @Prop()
  materialId: string;

  @Prop()
  vocabularyId: string;

  @Prop()
  isFinished: boolean;
}

export const MaterialToVocabularySchema =
  SchemaFactory.createForClass(MaterialToVocabulary);
