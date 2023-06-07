import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VocabularyDocument = HydratedDocument<Vocabulary>;

@Schema()
export class Vocabulary {

    @Prop()
    userId: string;

    @Prop()
    language: string;

    @Prop()
    vocabularyNativeLanguage: string;
}



export const VocabularySchema = SchemaFactory.createForClass(Vocabulary);