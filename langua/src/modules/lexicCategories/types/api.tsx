export interface FindManyLexicCategoriesParams {
    page: number;
    limit: number;
    language: string;
    nativeCategoryLanguage: string;
}

export interface CreateLexicCategoryParams {
    creatorUserId: string;
    categoryName: string;
    language: string;
    nativeCategoryLanguage: string;
}

export interface FindManyLexicCategoriesByCreatorIdParams
    extends FindManyLexicCategoriesParams {
    creatorId: string;
    language: string;
    nativeCategoryLanguage: string;
}
