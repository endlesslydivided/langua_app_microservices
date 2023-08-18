import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

const FIND_USER_BY_ID = gql`
    query FindUserById($id: String!) {
      findUserById(id: $id) {
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

const findUserByIdFetch = async ({id}:{id:string}) =>
{
    const data= await getClient().query<any, any>({
        query: FIND_USER_BY_ID,
        variables:{
            id
        }
    })

    return data;
}

export default findUserByIdFetch;


