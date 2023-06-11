import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LexicCategoryDocument = HydratedDocument<LexicCategory>;

@Schema({ timestamps: true, collection: 'lexic_categories' })
export class LexicCategory {
  @Prop()
  categoryName: string;

  @Prop()
  creatorUserId: string;
}

export const LexicCategorySchema = SchemaFactory.createForClass(LexicCategory);
