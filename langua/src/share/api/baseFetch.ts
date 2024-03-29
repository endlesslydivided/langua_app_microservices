import refreshTokensFetch from '@/modules/auth/api/auth/refreshTokens';
import { TypedDocumentNode, gql } from '@apollo/client';

import { InternalServerErrorException } from '../exceptions/internalServerError.exception';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { getClient } from './apollo-client';

const REFRESH_TOKEN = gql`
    mutation Refresh {
        refresh {
            accessToken
            refreshToken
        }
    }
`;

type BaseFetchParams = {
    query?: TypedDocumentNode;
    mutation?: TypedDocumentNode;
    variables?: object;
};

export const baseFetch = async (fetch: BaseFetchParams) => {
    try {
        const { data, errors } = await apolloFetch(fetch);

        if (
            (errors?.[0]?.extensions?.originalError as any)?.statusCode === 401
        ) {
            const { data: refreshData, errors: refreshErrors } =
                await refreshTokensFetch();

            if (
                (refreshErrors?.[0]?.extensions?.originalError as any)
                    ?.statusCode === 401
            ) {
                throw new UnauthorizedException({
                    reason: 'Refresh token is expired',
                });
            }

            const { data: fetchData, errors: fetchErrors } = await apolloFetch(
                fetch,
            );

            if (fetchErrors) {
                throw fetchErrors;
            }

            return fetchData;
        }

        if (errors) {
            throw errors;
        }

        return data;
    } catch (error: any) {
        if (error instanceof UnauthorizedException) {
            throw error;
        }
        const reason =
            error?.[0]?.extensions?.originalError?.message?.[0] ??
            error.graphQLErrors?.[0]?.message ??
            error.clienErrors?.[0]?.message ??
            error.networkError?.result?.errors?.[0]?.message ??
            error?.[0]?.message;

        throw new InternalServerErrorException({
            message: 'Some error occured on server',
            reason,
        });
    }
};

const apolloFetch = async ({ query, mutation, variables }: BaseFetchParams) => {
    if (query) {
        const result = await getClient().query({
            query,
            variables: variables ?? {},
            errorPolicy: 'all',
            fetchPolicy: 'no-cache',
        });

        return result;
    }

    if (mutation) {
        const result = await getClient().mutate({
            mutation,
            variables: variables ?? {},
            errorPolicy: 'all',
            fetchPolicy: 'no-cache',
        });
        return result;
    }

    throw Error('No query provided.');
};
