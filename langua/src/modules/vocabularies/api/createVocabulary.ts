import { getClient } from '@/share/api/apollo-client';
import { gql } from '@apollo/client';

import { CreateVocabularyParams } from '../types/api';

const CREATE_VOCABULARY = gql`
    mutation CreateVocabulary($createVocabulary: CreateVocabularyInput!) {
        createVocabulary(createVocabulary: $createVocabulary)
    }
`;

const createVocabulary = async (
    body: CreateVocabularyParams & { userId?: string },
) => {
    try {
        const { data, errors } = await getClient()
            .mutate({
                mutation: CREATE_VOCABULARY,
                variables: {
                    createVocabulary: {
                        userId: body.userId,
                        language: body.language,
                        vocabularyNativeLanguage: body.vocabularyNativeLanguage,
                    },
                },
            })
            .catch((error) => {
                throw new Error(error);
            });

        return data;
    } catch (error) {
        throw error;
    }
};

export default createVocabulary;
