import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"


let client:ApolloClient<any> | null = null;

export const getClient = () => {
    if(!client || typeof window === 'undefined') {
        client = new ApolloClient({
            link: new HttpLink({
                uri: `${process.env.API_GATEWAY_URI}`,
                credentials:"same-origin"
            }),
            cache: new InMemoryCache(),
        })
    }

    return client;
}