import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

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
                    name: z.string().min(1).max(30),
                    id: z.string().optional(), // For updating decks

                    // For options
                    options_random: z.boolean(),
                    options_time_limit: z.boolean(),
                    options_time_limit_MS: z.number().min(0).optional().default(30000),

                    // For question statuses
                    questions_new: z.number().min(0).optional(),
                    questions_done: z.number().min(0).optional().default(0),
                    questions_studying: z.number().min(0).optional().default(0),

                    owner_id: z.string().optional(),

                    questions: z.array(
                        z.object({
                            deck_id: z.string().optional(),
                            type: z.enum(["basic", "choice", "fill"]),
                            front: z.string().min(1).max(300),
                            back: z.string().min(1).max(300),
                            id: z.string().optional(),
                        })
                    ),
                })
                .required()
                .safeParse(req.body);
            if (!parsedBody.success && "error" in parsedBody) {
                return res.status(400).send({ message: "invalid-parameters" });
            }

            const { data: body } = parsedBody;
            const deckID = uuidv4();

            await prismaClient.$transaction([
                prismaClient.deck.create({
                    data: {
                        id: deckID,
                        owner_id: session.id,
                        name: body.name,

                        options_random: body.options_random,
                        options_time_limit: body.options_time_limit,
                        options_time_limit_MS: body.options_time_limit_MS,

                        questions_new: body.questions.length,
                        questions_done: 0,
                        questions_studying: 0,

                        public: false,
                    },
                    include: {
                        owner: false,
                    },
                }),
                prismaClient.deck_question.createMany({
                    data: body.questions.map((question) => ({
                        ...question,
                        deck_id: deckID,
                        id: uuidv4(),
                    })),
                }),
            ]);

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
