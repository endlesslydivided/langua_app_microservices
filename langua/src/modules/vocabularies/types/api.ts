export interface CreateVocabularyParams {
    vocabularyNativeLanguage: string;
    language: string;
}

export interface FindManyVocabulariesByUserIdParams {
    userId: string;
    limit: number;
    page: number;
}
