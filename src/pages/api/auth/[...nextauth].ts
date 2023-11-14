import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import NextAuth, { AuthOptions } from "next-auth";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { mongooseClient } from "@/lib/mongodb";

import AccountModel from "@/models/Account";

export const authOptions: AuthOptions = {
    secret: process.env.SESSION_SECRET as string,
    adapter: MongoDBAdapter(
        (async () => {
            return await mongooseClient.getClient();
        })(),
        {
            collections: {
                Accounts: "external-accounts",
                Sessions: "sessions",
                Users: "users",
                VerificationTokens: "verification-tokens",
            },
        }
    ),
    callbacks: {
        session(data) {
            // Add the user id to session information, which can be used to fetch information about the user in the database
            let newSession = { ...data.session, id: data.user.id };
            return newSession;
        },
    },
    events: {
        // TODO: Save for user statistics and admin panel
        createUser({ user }) {
            // Create a custom user in the database
            const newUser = new AccountModel({
                id: user.id,
                lastLogin: new Date(Date.now()),
                accountCreated: new Date(Date.now()),
                emailVerified: false,
            });
            newUser.save();
        },
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        // TODO: Create these pages
        // error: "/auth/error", // Error code passed in query string as ?error=
        // verifyRequest: "/auth/verify-request", // (used for check email message)
    },
};

export default NextAuth(authOptions);
