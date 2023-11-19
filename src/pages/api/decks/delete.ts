import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { prismaClient } from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";

type ResponseData = {
    message: "not-logged-in" | "invalid-parameters" | "success" | "no-deck" | "method-not-allowed";
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const session: (Session & { id: string }) | null = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "not-logged-in" });

    if (req.method === "POST") {
        const parsedBody = z
            .object({
                deckID: z.string(),
            })
            .required()
            .safeParse(req.body);
        if (!parsedBody.success && "error" in parsedBody)
            return res.status(400).send({ message: "invalid-parameters" });

        // Delete the deck defined in the request body
        await prismaClient.deck.delete({
            where: {
                id: parsedBody.data.deckID,
                owner_id: session.id,
            },
        });

        return res.status(200).json({ message: "success" });
    } else {
        res.status(405).json({ message: "method-not-allowed" });
    }
};

export default handler;
export type { ResponseData };
