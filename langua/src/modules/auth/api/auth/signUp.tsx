import { getClient } from '@/share/api/apollo-client';
import { SignUpInput } from '@/share/api/types';
import { gql } from '@apollo/client';

import { SignUpFormFields } from '../../widgets/Forms/SignUpForm';

const SIGN_UP = gql`
    mutation SignUp($signUp: SignUpInput!) {
        signUp(signUp: $signUp) {
            status
        }
    }
`;
const signUp = async (body: SignUpFormFields) => {
    try {
        const { confirmPassword, ...input } = await body;
        const { data, errors } = await getClient().mutate({
            mutation: SIGN_UP,
            variables: {
                signUp: input as SignUpInput,
            },
        });

        if (errors) {
            throw errors;
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export default signUp;
