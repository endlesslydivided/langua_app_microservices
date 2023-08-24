import { gql } from "@apollo/client";
import { getClient } from "../apollo-client";
const REFRESH_TOKEN = gql`
  mutation Refresh {
    refresh {
        accessToken
        refreshToken
    }
  }
`;


const refreshTokensFetch = async () =>
{
  try
  {
    const result = await getClient().mutate<any, any>({
      mutation: REFRESH_TOKEN
    });
    
    return result;
  }
  catch(error)
  {
      throw error;
  }
}

export default refreshTokensFetch;


