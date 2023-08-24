import { gql } from "@apollo/client";
import { baseFetch } from "../baseFetch";

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
        userContacts {
            createdAt
            email
            id
            phoneNumber
            updatedAt
        }
        userCredentials {
            createdAt
            id
            nickname
            updatedAt
        }
    }
}`


const findMe = async () =>
{

  try
  {
      const data = await baseFetch({
          query:FIND_ME
      });

      const user = data.findMe;

      return user;
  }
  catch(error)
  {
      throw error;
  }
}

export default findMe;


