import { LexicCategory } from "@/modules/lexicCategories/types/model";

export interface Word {
    language: string;
    transcription: string;
    wordToVocabulary: WordToVocabulary;
    lexicCategories: LexicCategory[];
  }

  
export interface WordToVocabulary {
    isFinished: boolean;
    vocabularyId: string;
    wordId: string;
  }