interface DeckType {
    name: string;
    id: string;
    options: {
        random: boolean;
        timeLimit: boolean;
        timeLimitMS: number;
    };
    questions: Array<{
        type: "basic" | "choice" | "fill";
        front: string;
        back: string;
        id: string;
    }>;
}

export type { DeckType };
