import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LexicCategoryController } from './controller/lexic-category.controller';
import { LexicCategoryRepository } from './repository/lexic-category.repository';
import {
  LexicCategory,
  LexicCategorySchema,
} from './schema/lexic-category.schema';
import { LexicCategoryService } from './service/lexic-category.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LexicCategory.name, schema: LexicCategorySchema },
    ]),
  ],
  providers: [LexicCategoryRepository, LexicCategoryService],
  controllers: [LexicCategoryController],
})
export class LexicCategoryModule {}
