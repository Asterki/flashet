import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";

import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { mongooseClient } from "../../../lib/mongodb";

export const authOptions = {
    secret: process.env.SESSION_SECRET as string,
    adapter: MongoDBAdapter((async () => {
        return await mongooseClient.getClient();
    })()),
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
