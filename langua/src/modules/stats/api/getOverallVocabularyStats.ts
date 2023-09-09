import { baseFetch } from '@/share/api/baseFetch';
import { Pagination } from '@/share/api/types';
import { gql } from '@apollo/client';

import { GetOverallVocabularyStatsParams } from '../types/api';

export const GET_OVERALL_VOCABULARY_STATS = gql`
    query GetOverallVocabularyStats($userId: String!) {
        getOverallVocabularyStats(userId: $userId) {
            totalLearnedMaterials
            totalLearnedWords
            totalStartedMaterials
            totalStartedWords
            userId
        }
    }
`;

const getOverallVocabularyStats = async ({
    userId,
}: GetOverallVocabularyStatsParams) => {
    try {
        const data = await baseFetch({
            query: GET_OVERALL_VOCABULARY_STATS,
            variables: {
                userId,
            },
        });

        return data.getOverallVocabularyStats;
    } catch (error) {
        throw error;
    }
};

export default getOverallVocabularyStats;
