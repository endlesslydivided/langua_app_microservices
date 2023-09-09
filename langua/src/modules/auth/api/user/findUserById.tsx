import { baseFetch } from '@/share/api/baseFetch';
import { gql } from '@apollo/client';

const FIND_USER_BY_ID = gql`
    query FindUserById($id: String!) {
        findUserById(id: $id) {
            birthday
            city
            country
            createdAt
            firstname
            id
            nativeLanguage
            password
            sex
            surname
            updatedAt
        }
    }
`;

const findUserById = async ({ id }: { id: string }) => {
    try {
        const data = await baseFetch({
            query: FIND_USER_BY_ID,
            variables: { id },
        });
        return data;
    } catch (error) {
        throw error;
    }
};

export default findUserById;
