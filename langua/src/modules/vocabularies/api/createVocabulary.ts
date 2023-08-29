import { gql } from "@apollo/client";
import { getClient } from "@/share/api/apollo-client";
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
          
    return data;
  }
  catch(error)
  {
      throw error;
  }
}

export default createVocabulary;


