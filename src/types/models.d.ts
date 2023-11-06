interface DeckType {
    name: string;
    id: string;
    options: {
        random: boolean;
        timeLimit: boolean;
        typeOfTimer: "question" | "full";
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
