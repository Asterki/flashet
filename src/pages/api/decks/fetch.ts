import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { prismaClient } from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { DeckWithQuestions } from "@/types/models";

type ResponseData = {
    message: "not-logged-in" | "invalid-parameters" | "success" | "no-deck" | "method-not-allowed";
    deck: DeckWithQuestions | null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const session: (Session & { id: string }) | null = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "not-logged-in", deck: null });

    if (req.method === "POST") {
        const parsedBody = z
            .object({
                deckID: z.string(),
            })
            .required()
            .safeParse(req.body);
        if (!parsedBody.success && "error" in parsedBody)
            return res.status(400).send({ message: "invalid-parameters", deck: null });

        const userDeck = (await prismaClient.deck.findFirst({
            where: {
                owner_id: session.id,
                id: parsedBody.data.deckID,
            },
            include: {
                questions: true,
            },
        })) as DeckWithQuestions | null;

        if (!userDeck) return res.status(200).json({ message: "no-deck", deck: null });
        return res.status(200).json({ message: "success", deck: userDeck });
    } else {
        res.status(405).json({ message: "method-not-allowed", deck: null });
    }
};

export default handler;
export type { ResponseData };
