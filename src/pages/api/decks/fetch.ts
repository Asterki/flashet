import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { prismaClient } from "@/lib/prisma";
import { logError } from "@/util/logs";

import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { DeckWithQuestions } from "@/types/models";

type ResponseData = {
    message: "not-logged-in" | "invalid-parameters" | "success" | "no-deck" | "method-not-allowed" | "server-error";
    deck: DeckWithQuestions | null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    try {
        const session: (Session & { id: string }) | null = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ message: "not-logged-in", deck: null });

        if (req.method === "POST") {
            const parsedBody = z
                .object({
                    deckID: z.string().uuid().min(36).max(36),
                })
                .required()
                .safeParse(req.body);
            if (!parsedBody.success && "error" in parsedBody)
                return res.status(400).send({ message: "invalid-parameters", deck: null });

            // Get the deck defined in the request body
            const userDeck = (await prismaClient.deck.findFirst({
                where: {
                    owner_id: session.id,
                    id: parsedBody.data.deckID,
                },
                include: {
                    questions: true,
                },
            })) as DeckWithQuestions | null;

            // If the deck doesn't exist, return an error
            if (!userDeck) return res.status(200).json({ message: "no-deck", deck: null });
            return res.status(200).json({ message: "success", deck: userDeck });
        } else {
            res.status(405).json({ message: "method-not-allowed", deck: null });
        }
    } catch (err) {
        logError(err);
        return res.status(500).json({ message: "server-error", deck: null });
    }
};

export default handler;
export type { ResponseData };
