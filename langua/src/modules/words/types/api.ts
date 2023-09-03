export interface CreateWordParams {
    language: string;
    nativeWordLanguage: string;
    lexicCategoryId: string;
    transcription: string;
    word: string;
    translation: string;
}

export interface FindOneWordById {
    id: string;
}

export interface FindManyWordsByVocabularyIdParams {
    vocabularyId: string;
    page: number;
    limit: number;
}

export interface FindManyWordsByLexicCategoryIdParams {
    vocabularyId: string;
    lexicCategoryId: string;
    page: number;
    limit: number;
}

export interface CreateWordToVocabularyParams {
    vocabularyId: string;
    wordId: string;
}

export interface UpdateWordToVocabularyParams {
    id: string;
    userId: string;
    isFinished: boolean;
}
