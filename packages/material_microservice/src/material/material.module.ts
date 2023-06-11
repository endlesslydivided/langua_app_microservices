import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MaterialController } from './controller/material.controller';
import { MaterialRepository } from './repository/material.repository';
import { MaterialToVocabularyRepository } from './repository/material-to-vocabulary.repository';
import { Material, MaterialSchema } from './schema/material.schema';
import {
  MaterialToVocabulary,
  MaterialToVocabularySchema,
} from './schema/material-to-vocabulary.schema';
import { MaterialService } from './service/material.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Material.name, schema: MaterialSchema },
      { name: MaterialToVocabulary.name, schema: MaterialToVocabularySchema },
    ]),
  ],
  controllers: [MaterialController],
  providers: [
    MaterialRepository,
    MaterialToVocabularyRepository,
    MaterialService,
  ],
})
export class MaterialModule {}
