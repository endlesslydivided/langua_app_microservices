import { SignUpForm } from "@/app/@auth/types";
import { gql } from "@apollo/client";
import { getClient } from "../apollo-client";
import { SignUpInput } from "../types";


const SIGN_UP = gql`
mutation SignUp($signUp: SignUpInput!) {
  signUp(signUp: $signUp){
    status
  }
}
`;
const signUp = async (body:SignUpForm) =>
{
  try
  {
   
    const {confirmPassword, ...input }  = await body;
    const {data,errors}= await getClient().mutate<any, any>({
        mutation: SIGN_UP,
        variables:{
            signUp: input as SignUpInput
        }
    })

    if(errors)
    {
      throw errors;
    }
    
    return data;
  }
  catch(error)
  {
      throw error;
  }
}

export default signUp;


