import GoogleProvider from "next-auth/providers/google";
import NextAuth, { AuthOptions } from "next-auth";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { authDBClientPromise } from "@/lib/mongodb";

export const authOptions: AuthOptions = {
    secret: process.env.SESSION_SECRET as string,
    adapter: MongoDBAdapter(authDBClientPromise, {
        collections: {
            Accounts: "external-accounts",
            Sessions: "sessions",
            Users: "users",
            VerificationTokens: "verification-tokens",
        },
    }),
    events: {
        // TODO: Save for user statistics and admin panel
        createUser({ user }) {},
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        // error: "/auth/error", // Error code passed in query string as ?error=
        // verifyRequest: "/auth/verify-request", // (used for check email message)
        // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    },
};

export default NextAuth(authOptions);
