import { getClient } from '@/share/api/apollo-client';
import { gql } from '@apollo/client';

import { FindManyWordsByLexicCategoryIdParams } from '../types/api';

const FIND_MANY_WORDS_BY_LEXIC_CATEGORY_ID = gql`
    query FindManyWordsByLexicCategoryId(
        $vocabularyId: String!
        $lexicCategoryId: String!
        $limit: Int
        $page: Int
    ) {
        findManyWordsByLexicCategoryId(
            vocabularyId: $vocabularyId
            lexicCategoryId: $lexicCategoryId
            limit: $limit
            page: $page
        ) {
            count
            rows {
                id
                language
                transcription
                word
                translation
                nativeWordLanguage
                lexicCategories {
                    categoryName
                    creatorUserId
                }
                wordToVocabulary {
                    id
                    isFinished
                    vocabularyId
                    wordId
                }
            }
        }
    }
`;

const findManyWordsByLexicCategoryId = async ({
    lexicCategoryId,
    page,
    limit,
    vocabularyId,
}: FindManyWordsByLexicCategoryIdParams) => {
    try {
        const { data, error } = await getClient().query({
            query: FIND_MANY_WORDS_BY_LEXIC_CATEGORY_ID,
            variables: {
                vocabularyId,
                lexicCategoryId,
                page,
                limit,
            },
        });

        return data.findManyWordsByLexicCategoryId;
    } catch (error) {
        throw error;
    }
};

export default findManyWordsByLexicCategoryId;
