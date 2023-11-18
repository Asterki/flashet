import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

import { prismaClient } from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { DeckType } from "@/types/models";

type ResponseData = {
    message: "not-logged-in" | "invalid-parameters" | "success" | "method-not-allowed";
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const session: (Session & { id: string }) | null = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "not-logged-in" });

    if (req.method === "POST") {
        const parsedBody = z
            .object({
                name: z.string(),
                id: z.string(),
                owner: z.string(),
                options: z.object({
                    random: z.boolean(),
                    timeLimit: z.boolean(),
                    timeLimitMS: z.number(),
                }),
                questions: z.array(
                    z.object({
                        type: z.enum(["basic", "choice", "fill"]),
                        front: z.string(),
                        back: z.string(),
                        id: z.string(),
                    })
                ),
            })
            .required()
            .safeParse(req.body);
        if (!parsedBody.success && "error" in parsedBody)
            return res.status(400).send({ message: "invalid-parameters" });

        const { data: body } = parsedBody;

        const deckID = uuidv4();
        await prismaClient.deck.create({
            data: {
                id: deckID,
                name: body.name,
                owner_id: session.id,

                questions_new: body.questions.length,
                questions_done: 0,
                questions_studying: 0,

                // Options
                options_random: body.options.random,
                options_time_limit: body.options.timeLimit,
                options_time_limit_MS: body.options.timeLimitMS,

                // Questions
                questions: {
                    createMany: {
                        data: body.questions.map((question) => ({
                            id: uuidv4(),
                            type: question.type,
                            front: question.front,
                            back: question.back,
                        })),
                        skipDuplicates: true,
                    },
                },
            },
            include: {
                owner: false,
            },
        });

        res.status(200).json({ message: "success" });
    } else {
        res.status(405).json({ message: "method-not-allowed" });
    }
};

export default handler;
export type { ResponseData };
