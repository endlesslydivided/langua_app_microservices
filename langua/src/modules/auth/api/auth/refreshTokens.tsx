import { getClient } from '@/share/api/apollo-client';
import { gql } from '@apollo/client';

const REFRESH_TOKEN = gql`
    mutation Refresh {
        refresh {
            accessToken
            refreshToken
        }
    }
`;

const refreshTokensFetch = async () => {
    try {
        const result = await getClient().mutate({
            mutation: REFRESH_TOKEN,
        });

        return result;
    } catch (error) {
        throw error;
    }
};

export default refreshTokensFetch;
