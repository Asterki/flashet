import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

import NextAuth, { AuthOptions } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "@/lib/prisma";

// import AccountModel from "@/models/Account";

export const authOptions: AuthOptions = {
    secret: process.env.SESSION_SECRET as string,
    adapter: PrismaAdapter(prismaClient),
    callbacks: {
        session(data) {
            // Add the user id to session information, which can be used to fetch information about the user in the database
            let newSession = { ...data.session, id: data.user.id };
            return newSession;
        },
    },
    events: {
        // TODO: Save for user statistics and admin panel
        async createUser({ user }) {
            // Create a custom user in the database
            await prismaClient.preferences.create({
                data: {
                    user_id: user.id,
                    account_created: new Date(Date.now()),
                    last_login: new Date(Date.now()),
                },
            });
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
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
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
