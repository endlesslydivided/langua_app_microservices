import { getClient } from '@/share/api/apollo-client';
import { gql } from '@apollo/client';

import { SignInFormFields } from '../../widgets/Forms/SignInForm';

const SIGN_IN = gql`
    mutation SignIn($signIn: SignInInput!) {
        signIn(signIn: $signIn) {
            accessToken
            refreshToken
        }
    }
`;

const signIn = async (body: SignInFormFields) => {
    try {
        const { data, errors } = await getClient()
            .mutate({
                mutation: SIGN_IN,
                variables: {
                    signIn: {
                        email: body.email,
                        password: body.password,
                    },
                },
            })
            .catch((error) => {
                throw new Error(error);
            });

        const tokens = data?.signIn;

        return tokens;
    } catch (error) {
        throw error;
    }
};

export default signIn;
