import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getClient } from '@/lib/apollo-client'
import { gql } from '@apollo/client'

const SIGN_UP = gql`
mutation SignUp($signUp: SignUpInput!) {
    signUp(signUp: $signUp)
  }
`

const SIGN_IN = gql`
mutation SignIn($signIn: SignInInput!) {
    signIn(signIn: $signIn) {
        accessToken
    }
}
`
export const options: NextAuthOptions = {
   
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
          }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "text",
                    placeholder: "Email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Password"
                }
            },
            async authorize(credentials: SignInInput | any) {
                const {data} = await getClient().query<any,SignInInput>({query:SIGN_IN,variables:
                    {
                      ...credentials
                    }})

                if (data.accessToken) {
                    return data.accessToken
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signIn',
        signOut: '/auth/signOut',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/auth/new-user'
      },
}