import { getClient } from '@/share/api/apollo-client';
import { gql } from '@apollo/client';

export const AUTH_URI = '/auth';

const SIGN_OUT = gql`
    mutation SignOut {
        signOut {
            status
        }
    }
`;

const signOutFetch = async () => {
    try {
        const { data, errors } = await getClient().mutate({
            mutation: SIGN_OUT,
        });

        if (errors) {
            throw errors;
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export default signOutFetch;
