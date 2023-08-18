import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { SignInInput } from "./types";

const SIGN_IN = gql`
  mutation SignIn($signIn: SignInInput!) {
    signIn(signIn: $signIn) {
      accessToken
    }
  }
`;

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: 'credentials',
      name: "сredentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials: SignInInput | any,request) {
        const {data,errors}:any = await getClient().mutate<any, any>({
          mutation: SIGN_IN,
          variables: {
            signIn: {
              email: credentials.email,
              password: credentials.password
            },
          },
        }).catch((error) =>
        {
          throw new Error(error)
        })
        
        const tokens = data.signIn;
        
        if (data && !errors) {
          return tokens;
        } else {
          throw new Error(JSON.stringify(data))
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user",
    error: "/auth",

  },
};
