import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';


export type VocabularyStatsDocument = HydratedDocument<VocabularyStats>;


@Schema({timestamps: true,collection: 'vocubulary_stats'})
export class VocabularyStats {
  @Prop()
  userId: string;

  @Prop()
  startedMaterialsCount: number;

  @Prop()
  learnedMaterialsCount: number;

  @Prop()
  startedWordsCount: number;

  @Prop()
  learnedWordsCount: number;

}

export const VocabularyStatsSchema = SchemaFactory.createForClass(VocabularyStats);
