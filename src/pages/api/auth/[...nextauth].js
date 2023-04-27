import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
// import { CredentialsProvider } from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../../database/conn";
import Users from "../../../../model/Schema";
import { compare } from "bcryptjs";


export default NextAuth({
    providers: [
        // Google Provider
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),

        //  Github Provider
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),

        // Credential provider
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req){
                connectMongo().catch(error => {error: "Connection failed..."})

                // check user existence
                const result = await Users.findOne({ email: credentials.email})
                if(!result){
                    throw new Error('No user found with email, Please sign up')
                }

                // compare()
                const checkPassword = await compare(credentials.password, result.password)

                // incorrect password
                if(!checkPassword || result.email !== credentials.email) {
                    throw new Error('username or password doesnt match')
                }

                return result
            }
        })
    ],
    secret: "b1eSa9DTl/DTRiWwaTBvLQGDA1kLvmRzXKrA4qWUbXM="
})


// email":"kanuchi@gmail.com",
// "password":"chinaza725"