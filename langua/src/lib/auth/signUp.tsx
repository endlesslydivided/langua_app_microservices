import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

const SIGN_UP = gql`
  mutation SignUp($signUp: SignUpInput!) {
    signUp(signUp: $signUp)
  }
`;

const signUpFetch = async (body:SignUpForm) =>
{
    const {confirmPassword, ...input } = body;
    const data= await getClient().query<any, any>({
        query: SIGN_UP,
        variables:{
            signUp: body as SignUpInput
        }
    }).catch((error:any) =>
    {
      console.log(error);
    });

    return data
}

export default signUpFetch;


