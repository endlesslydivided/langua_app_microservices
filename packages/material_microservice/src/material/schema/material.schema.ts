import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MaterialDocument = HydratedDocument<Material>;

@Schema({ timestamps: true })
export class Material {
  @Prop()
  creatorUserId: string;

  @Prop()
  name: string;

  @Prop()
  textContent: string;

  @Prop()
  language: string;
}

export const MaterialSchema = SchemaFactory.createForClass(Material);
