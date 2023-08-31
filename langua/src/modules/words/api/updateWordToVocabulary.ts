import { baseFetch } from "@/share/api/baseFetch";
import { gql } from "@apollo/client";
import { UpdateWordToVocabularyParams } from "../types/api";



export const UPDATE_WORD_TO_VOCABULARY = gql`mutation UpdateWordToVocabulary($updateWordToVocabulary: UpdateWordToVocabularyInput!) {
    updateWordToVocabulary(updateWordToVocabulary: $updateWordToVocabulary)
}
`

const updateWordToVocabulary = async ({id,userId,isFinished}:UpdateWordToVocabularyParams) =>
{
    try
    {
        const data = await baseFetch({
            mutation:UPDATE_WORD_TO_VOCABULARY,
            variables:{
                updateWordToVocabulary:
                {
                    id,
                    userId,
                    isFinished
                }
            }, 
        });
        
        return data.updateWordToVocabulary;

    }
    catch(error)
    {
        throw error;
    }
    
}

export default updateWordToVocabulary;