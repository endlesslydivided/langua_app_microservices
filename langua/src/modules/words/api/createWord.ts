import { baseFetch } from '@/share/api/baseFetch';
import { gql } from '@apollo/client';

import { CreateWordParams } from '../types/api';

export const CREATE_WORD = gql`
    mutation CreateWord($createWord: CreateWordInput!) {
        createWord(createWord: $createWord)
    }
`;

const createWord = async ({
    language,
    lexicCategoryId,
    transcription,
    word,
    nativeWordLanguage,
    translation,
}: CreateWordParams) => {
    try {
        const data = await baseFetch({
            mutation: CREATE_WORD,
            variables: {
                createWord: {
                    language,
                    translation,
                    lexicCategoryId,
                    transcription,
                    word,
                    nativeWordLanguage,
                },
            },
        });

        return data.createWord;
    } catch (error) {
        throw error;
    }
};

export default createWord;
