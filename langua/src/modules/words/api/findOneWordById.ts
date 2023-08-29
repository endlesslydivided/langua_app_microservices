import { getClient } from "@/share/api/apollo-client";
import { gql } from "@apollo/client";
import { FindOneWordById } from "../types/api";



const FIND_ONE_WORD_BY_ID = gql`query FindOneWordById($id:String!) {
  findOneWordById(id: $id) {
      language
      transcription
      word
  }
}
`;


const findOneWordById = async ({id}:FindOneWordById) =>
{
  try
  {
    const { data, error } = await getClient().query({
      query: FIND_ONE_WORD_BY_ID,
      variables: {
        id
      },
    });

    
    return data.findOneWordById;

  }
  catch(error)
  {
      throw error;
  }
}

export default findOneWordById;