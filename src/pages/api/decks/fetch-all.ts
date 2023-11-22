import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { prismaClient } from "@/lib/prisma";
import { logError } from "@/util/logs";

import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { DeckType } from "@/types/models";

type ResponseData = {
    decks: Array<DeckType> | null;
    message: "not-logged-in" | "success" | "method-not-allowed" | "server-error";
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    try {
        const session: (Session & { id: string }) | null = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ message: "not-logged-in", decks: null });

        if (req.method === "GET") {
            const userDecks = await prismaClient.deck.findMany({
                where: {
                    owner_id: session.id,
                },
                include: {
                    questions: false,
                    owner: false,
                },
            });

            res.status(200).json({ message: "success", decks: userDecks });
        } else {
            res.status(405).json({ message: "method-not-allowed", decks: null });
        }
    } catch (err) {
        logError(err);
        return res.status(500).json({ message: "server-error", decks: null });
    }
};

export default handler;
export type { ResponseData };
