import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import DeckModel from "@/models/decks";

import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    message: string;
};

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "not-logged-in" });

    return console.log(Object.keys(req));

    if (req.method === "POST") {
        const parsedBody = z
            .object({
                name: z.string(),
                id: z.string(),
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

        const deck = new DeckModel({
            id: body.id,
            name: body.name,
            options: body.options,
            owner: session.user?.name,
            questions: body.questions,
        });
        await deck.save();

        res.status(200).json({ message: "Hello from Next.js!" });
    } else {
        res.status(405).json({ message: "method-not-allowed" });
    }
};

export default handler;
export { ResponseData };
