import { Module } from '@nestjs/common';
import { WordModule } from './word/word.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { LexicCategoryModule } from './lexic-category/lexic-category.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    WordModule, 
    VocabularyModule, 
    LexicCategoryModule,
    MongooseModule.forRoot('mongodb://localhost/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1')],
  controllers: [],
  providers: [],
})
export class AppModule {}
