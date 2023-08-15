export interface Word {
  language: string;
  transcription: string;
  wordToVocabulary: WordToVocabulary;
  lexicCategories: LexicCategory[];
}

export interface LexicCategory {
  categoryName: string;
  creatorUserId: string;
}

export interface WordToVocabulary {
  isFinished: boolean;
  vocabularyId: string;
  wordId: string;
}
