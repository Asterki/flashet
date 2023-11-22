import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

import { prismaClient } from "@/lib/prisma";
import { logError } from "@/util/logs";

import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { SearchResult } from "@/types/models";

type ResponseData = {
    message: "not-logged-in" | "invalid-parameters" | "success" | "no-deck" | "method-not-allowed" | "server-error";
    decks: SearchResult[] | null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    try {
        const session: (Session & { id: string }) | null = await getServerSession(req, res, authOptions);
        if (!session) return res.status(401).json({ message: "not-logged-in", decks: null });

        if (req.method === "POST") {
            const parsedBody = z
                .object({
                    query: z.string().min(1).max(100),
                })
                .required()
                .safeParse(req.body);
            if (!parsedBody.success && "error" in parsedBody)
                return res.status(400).send({ message: "invalid-parameters", decks: null });

            // Get the deck defined in the request body
            const decks = (await prismaClient.deck.findMany({
                where: {
                    // Case insensitive search
                    name: {
                        contains: parsedBody.data.query,
                        mode: "insensitive",
                    },
                    public: true, // Only search for public decks
                },
                select: {
                    id: true,
                    name: true,
                    _count: {
                        select: {
                            questions: true,
                        },
                    },
                    owner: {
                        select: {
                            name: true,
                        },
                    },
                },
            })) as SearchResult[];

            return res.status(200).json({ message: "success", decks: decks });
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
