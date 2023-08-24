import { gql } from "@apollo/client";
import { FindManyWordsByVocabularyIdParams, Pagination } from "../types";
import { getClient } from "../apollo-client";




const FIND_MANY_WORDS_BY_VOCABULARY_ID = gql`
  query FindManyWordsByVocabularyId(
    $vocabularyId: String!
    $limit: Int
    $page: Int
  ) {
    findManyWordsByVocabularyId(
      limit: $limit
      page: $page
      vocabularyId: $vocabularyId
    ) {
      count
      rows {
        language
        transcription
        word
        lexicCategories {
          categoryName
          creatorUserId
        }
        wordToVocabulary {
          isFinished
          vocabularyId
          wordId
        }
      }
    }
  }
`;


const findManyWordsByVocabularyId = async ({vocabularyId,page,limit}:FindManyWordsByVocabularyIdParams) =>
{
    const { data, error } = await getClient().query({
        query: FIND_MANY_WORDS_BY_VOCABULARY_ID,
        variables: {
          vocabularyId,
          limit,
          page,
        },
      });
    
    if(error)
    {
        throw error;
    }
    return data;
}

export default findManyWordsByVocabularyId;