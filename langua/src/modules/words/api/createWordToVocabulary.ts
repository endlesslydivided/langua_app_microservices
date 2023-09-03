import { baseFetch } from '@/share/api/baseFetch';
import { gql } from '@apollo/client';

import { CreateWordParams, CreateWordToVocabularyParams } from '../types/api';

export const CREATE_WORD_TO_VOCABULARY = gql`
    mutation CreateWordToVocabulary(
        $createWordToVocabulary: CreateWordToVocabularyInput!
    ) {
        createWordToVocabulary(createWordToVocabulary: $createWordToVocabulary)
    }
`;

const createWordToVocabulary = async ({
    vocabularyId,
    wordId,
}: CreateWordToVocabularyParams) => {
    try {
        const data = await baseFetch({
            mutation: CREATE_WORD_TO_VOCABULARY,
            variables: {
                createWordToVocabulary: {
                    vocabularyId,
                    wordId,
                },
            },
        });

        return data.createWordToVocabulary;
    } catch (error) {
        throw error;
    }
};

export default createWordToVocabulary;
