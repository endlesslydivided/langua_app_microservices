import { SignInForm } from "@/app/@auth/types";
import { gql } from "@apollo/client";
import { getClient } from "../apollo-client";
const SIGN_IN = gql`
  mutation SignIn($signIn: SignInInput!) {
    signIn(signIn: $signIn) {
      accessToken
      refreshToken
    }
  }
`;

const signIn = async (body:SignInForm) =>
{
  try
  {
    const {data,errors}:any = await getClient().mutate<any, any>({
        mutation: SIGN_IN,
        variables: {
          signIn: {
            email: body.email,
            password: body.password
          },
        },
    }).catch((error) =>
    {
        throw new Error(error)
    })
      
    const tokens = data.signIn;
    
    return tokens;
  }
  catch(error)
  {
      throw error;
  }
}

export default signIn;


