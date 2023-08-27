import { gql } from "@apollo/client";
import { getClient } from "../apollo-client";
import { VocabularyForm } from "@/widgets/Cards/FinishCard/FinishCard";
const CREATE_VOCABULARY = gql`
mutation CreateVocabulary($createVocabulary: CreateVocabularyInput!) {
    createVocabulary(createVocabulary: $createVocabulary)
}
`;

const createVocabulary = async (body:VocabularyForm & {userId?:string}) =>
{
  try
  {
    const {data,errors}:any = await getClient().mutate<any, any>({
        mutation: CREATE_VOCABULARY,
        variables: {
            createVocabulary: {
                userId: body.userId,
                language: body.language,
                vocabularyNativeLanguage: body.vocabularyNativeLanguage
            },
        },
    }).catch((error) =>
    {
        throw new Error(error)
    })
      
    const tokens = data?.signIn;
    
    return tokens;
  }
  catch(error)
  {
      throw error;
  }
}

export default createVocabulary;


