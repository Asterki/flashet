interface DeckType {
    name: string;
    id: string;
    owner: string;
    options: {
        random: boolean;
        timeLimit: boolean;
        timeLimitMS: number;
    };
    questionStatus: {
        new: number;
        studying: number;
        done: number;
    };
    questions: Array<{
        type: "basic" | "choice" | "fill";
        front: string;
        back: string;
        id: string;
    }>;
}

interface Account {
    id: string;
    lastLogin: Date;
    accountCreated: Date;
    emailVerified: Boolean;
}

export type { DeckType, Account };
