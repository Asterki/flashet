import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { prismaClient } from "@/lib/prisma";
import { logError } from "@/util/logs";

import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";

type ResponseData = {
    message: "not-logged-in" | "invalid-parameters" | "success" | "method-not-allowed" | "server-error";
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    try {
        const session: (Session & { id: string }) | null = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ message: "not-logged-in" });

        if (req.method === "POST") {
            const parsedBody = z
                .object({
                    deckID: z.string().uuid().min(36).max(36),
                })
                .required()
                .safeParse(req.body);
            if (!parsedBody.success && "error" in parsedBody)
                return res.status(400).send({ message: "invalid-parameters" });

            const { data: body } = parsedBody;

            const amountOfQuestionsInDeck = await prismaClient.deck_question.count({
                where: {
                    deck_id: body.deckID,
                },
            });

            await prismaClient.deck.update({
                where: {
                    id: body.deckID,
                },
                data: {
                    // Reset only question status
                    questions_new: amountOfQuestionsInDeck,
                    questions_done: 0,
                    questions_studying: 0,
                },
                include: {
                    owner: false,
                },
            });

            res.status(200).json({ message: "success" });
        } else {
            res.status(405).json({ message: "method-not-allowed" });
        }
    } catch (err) {
        logError(err);
        return res.status(500).json({ message: "server-error" });
    }
};

export default handler;
export type { ResponseData };
