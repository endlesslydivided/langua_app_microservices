import { LexicCategory } from "@/modules/lexicCategories/types/model";

export interface Word {
    id:string;
    word:string;
    translation:string;
    language: string;
    transcription: string;
    wordToVocabulary: WordToVocabulary[];
    lexicCategories: LexicCategory[];
  }

  
export interface WordToVocabulary {
    id:string;
    isFinished: boolean;
    vocabularyId: string;
    wordId: string;
  }