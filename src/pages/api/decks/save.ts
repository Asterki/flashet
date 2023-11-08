import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import DecksModel from "@/models/Deck";

import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";

type ResponseData = {
    message: string;
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) => {
    const session: (Session & { id: string }) | null = await getServerSession(
        req,
        res,
        authOptions
    );
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

        const deck = new DecksModel({
            id: body.id,
            name: body.name,
            options: body.options,
            owner: session.id,
            questions: body.questions,
        });
        await deck.save();

        res.status(200).json({ message: "success" });
    } else {
        res.status(405).json({ message: "method-not-allowed" });
    }
};

export default handler;
export type { ResponseData };
