import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { LexicCategory } from '../../lexic-category/schema/lexic-category.schema';

export type WordDocument = HydratedDocument<Word>;


@Schema({timestamps: true,collection: 'words'})
export class Word {
  @Prop()
  word: string;

  @Prop()
  transcription: string;

  @Prop()
  language: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'LexicCategories' })
  lexicCategories: LexicCategory[];
}

export const WordSchema = SchemaFactory.createForClass(Word);
