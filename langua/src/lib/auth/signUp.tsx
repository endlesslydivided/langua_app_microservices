import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp($signUp: SignUpInput!) {
    signUp(signUp: $signUp){
      status
    }
  }
`;

const signUpFetch = async (body:SignUpForm) =>
{
    const {confirmPassword, ...input } = body;
    const data= await getClient().mutate<any, any>({
        mutation: SIGN_UP,
        variables:{
            signUp: input as SignUpInput
        }
    })

    return data;
}

export default signUpFetch;


