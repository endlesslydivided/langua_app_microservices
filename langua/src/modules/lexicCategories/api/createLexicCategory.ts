import { baseFetch } from '@/share/api/baseFetch';
import { gql } from '@apollo/client';

import { CreateLexicCategoryParams } from '../types/api';

export const CREATE_LEXIC_CATEGORY = gql`
    mutation CreateLexicCategory(
        $createLexicCategory: CreateLexicCategoryInput!
    ) {
        createLexicCategory(createLexicCategory: $createLexicCategory)
    }
`;

const createLexicCategory = async ({
    categoryName,
    creatorUserId,
    language,
    nativeCategoryLanguage,
}: CreateLexicCategoryParams) => {
    try {
        const data = await baseFetch({
            mutation: CREATE_LEXIC_CATEGORY,
            variables: {
                createLexicCategory: {
                    categoryName,
                    creatorUserId,
                    language,
                    nativeCategoryLanguage,
                },
            },
        });

        return data.createLexicCategory;
    } catch (error) {
        throw error;
    }
};

export default createLexicCategory;
