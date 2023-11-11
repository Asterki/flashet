import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import DecksModel from "@/models/Deck";

import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { DeckType } from "@/types/models";

type ResponseData = {
    decks: Array<DeckType> | null;
    message: string | null;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
    const session: (Session & { id: string }) | null = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "not-logged-in", decks: null });

    if (req.method === "GET") {
        const userDecks: Array<DeckType> = await DecksModel.find({ owner: session.id });
        res.status(200).json({ message: "success", decks: userDecks });
    } else {
        res.status(405).json({ message: "method-not-allowed", decks: null });
    }
};

export default handler;
export type { ResponseData };
