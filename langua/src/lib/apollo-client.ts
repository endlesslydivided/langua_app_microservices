import { GATEWAY_URI } from "@/consts/api";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

let client: ApolloClient<any> | null = null;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const getClient = () => {
  if (!client || typeof window === "undefined") {

    const link = new HttpLink({uri: `${GATEWAY_URI}`});
    client = new ApolloClient({
      uri:GATEWAY_URI,
      cache: new InMemoryCache(),
    });
  }

  return client;
};
