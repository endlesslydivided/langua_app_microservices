import { gql } from "@apollo/client";
import { getClient } from "@/share/api/apollo-client";

interface FindManyVocabulariesByUserIdParams
{
    userId:string;
    limit:number;
    page:number;
}

const FIND_MANY_VOCABULARIES_BY_USER_ID = gql`
query FindManyVocabulariesByUserId($limit: Int!, $page: Int!, $userId: String!) {
    findManyVocabulariesByUserId(
        limit: $limit
        page: $page
        userId: $userId
    ) {
        count
        rows {
            language
            userId
            vocabularyNativeLanguage
            createdAt
            updatedAt
        }
    }
}
`;

const findManyVocabulariesByUserId = async (body:FindManyVocabulariesByUserIdParams) =>
{
  try
  {
    const {data,errors}:any = await getClient().mutate<any, any>({
        mutation: FIND_MANY_VOCABULARIES_BY_USER_ID,
        variables: {
            limit: body.limit,
            page: body.page,
            userId: body.userId,

        },
    }).catch((error) =>
    {
        throw new Error(error)
    })
      
    const {count,rows} = data?.findManyVocabulariesByUserId;
    
    return {count,rows};
  }
  catch(error)
  {
      throw error;
  }
}

export default findManyVocabulariesByUserId;


