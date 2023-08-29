import { getClient } from "@/share/api/apollo-client";
import { gql } from "@apollo/client";
import { FindManyWordsByLexicCategoryIdParams } from "../types/api";


const FIND_MANY_WORDS_BY_LEXIC_CATEGORY_ID = gql`
query FindManyWordsByLexicCategoryId($lexicCategoryId:String!,$limit: Int, $page: Int) {
  findManyWordsByLexicCategoryId(
      lexicCategoryId: $lexicCategoryId
      limit: $limit
      page: $page
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
      }
  }
}
`;


const findManyWordsByLexicCategoryId = async ({ lexicCategoryId,page,limit}:FindManyWordsByLexicCategoryIdParams) =>
{
    try
    {
        const { data, error } = await getClient().query({
            query: FIND_MANY_WORDS_BY_LEXIC_CATEGORY_ID,
            variables: {
            lexicCategoryId,
            page,
            limit
            },
        });
    
        
        return data.findManyWordsByLexicCategoryId;

    }
    catch(error)
    {
        throw error;
    }
}

export default findManyWordsByLexicCategoryId;