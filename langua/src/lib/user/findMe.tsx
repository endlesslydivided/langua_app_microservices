import { SignUpForm } from "@/app/@auth/types";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

export const FIND_ME = gql`
query FindMe {
  findMe {
      birthday
      city
      country
      createdAt
      firstname
      id
      nativeLanguage
      password
      sex
      surname
      updatedAt
  }
}

`;

const findMeFetch = async () =>
{
    const {data,error} = await getClient().query<any, any>({
        query: FIND_ME,
    })
    
    if(error)
    {
      throw new Error(error.message);
    }

    return data.findMe;
}

export default findMeFetch;


