import { Injectable } from "@nestjs/common";
import { Vocabulary } from "../schema/vocabulary.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";



@Injectable()
export class VocabularyRepository{  
    
    @InjectModel(Vocabulary.name) 
    private vocabularyModel: Model<Vocabulary>


    async create(dto: void): Promise<void> {
        // const vocabulary = new this.vocabularyModel(dto);
        // return vocabulary.save();
    }

      

    async findOneById(id: string): Promise<void> {
     
    }



    async softDeleteUser(id: string): Promise<void> {
    }
}