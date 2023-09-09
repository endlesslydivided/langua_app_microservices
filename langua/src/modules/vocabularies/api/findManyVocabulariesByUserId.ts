import { getClient } from '@/share/api/apollo-client';
import { gql } from '@apollo/client';

import { FindManyVocabulariesByUserIdParams } from '../types/api';

const FIND_MANY_VOCABULARIES_BY_USER_ID = gql`
    query FindManyVocabulariesByUserId(
        $limit: Int!
        $page: Int!
        $userId: String!
    ) {
        findManyVocabulariesByUserId(
            limit: $limit
            page: $page
            userId: $userId
        ) {
            count
            rows {
                id
                language
                userId
                vocabularyNativeLanguage
                createdAt
                updatedAt
            }
        }
    }
`;

const findManyVocabulariesByUserId = async (
    body: FindManyVocabulariesByUserIdParams,
) => {
    try {
        const { data, errors } = await getClient()
            .mutate({
                mutation: FIND_MANY_VOCABULARIES_BY_USER_ID,
                variables: {
                    limit: body.limit,
                    page: body.page,
                    userId: body.userId,
                },
            })
            .catch((error) => {
                throw new Error(error);
            });

        const { count, rows } = data?.findManyVocabulariesByUserId;

        return { count, rows };
    } catch (error) {
        throw error;
    }
};

export default findManyVocabulariesByUserId;
