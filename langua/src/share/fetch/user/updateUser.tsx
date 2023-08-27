import { gql } from "@apollo/client";
import { baseFetch } from "../baseFetch";
import { FinishRegisterForm } from "@/widgets/Cards/FinishCard/FinishCard";

export const UPDATE_USER = gql`
mutation UpdateUser($updateUser: UpdateUserInput!) {
    updateUser(updateUser: $updateUser) {
        status
    }
}`


const updateUser = async (values:FinishRegisterForm & {id?:string}) =>
{

  try
  {
      const data = await baseFetch({
          mutation:UPDATE_USER,
          variables: {
            updateUser: {...values}
          }
      });

      const status = data?.updateUser;

      return status;
  }
  catch(error)
  {
      throw error;
  }
}

export default updateUser;


