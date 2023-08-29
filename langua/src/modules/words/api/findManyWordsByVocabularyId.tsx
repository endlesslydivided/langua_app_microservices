import { getClient } from "@/share/api/apollo-client";
import { gql } from "@apollo/client";

interface FindManyWordsByVocabularyIdParams
{
  vocabularyId:string,
  page:number,
  limit:number
}


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

  try
  {
    const { data, error } = await getClient().query({
      query: FIND_MANY_WORDS_BY_VOCABULARY_ID,
      variables: {
        vocabularyId,
        limit,
        page,
      },
    });
  
    
    return data.findManyWordsByVocabularyId;

  }
  catch(error)
  {
      throw error;
  }
}

export default findManyWordsByVocabularyId;