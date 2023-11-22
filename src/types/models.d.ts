interface DeckType {
    id: string;
    name: string;
    owner_id: string;
    questions_new: number;
    questions_studying: number;
    questions_done: number;
    options_random: boolean;
    options_time_limit: boolean;
    options_time_limit_MS: number | null;
    public?: boolean;
}

interface QuestionType {
    id: string;
    deck_id: string;
    type: "basic" | "choice" | "fill";
    front: string;
    back: string;
}

interface DeckWithQuestions extends DeckType {
    questions: QuestionType[];
}

interface Account {
    user_id: string;
    last_login: Date;
    account_created: Date;
}

export type { DeckType, QuestionType, DeckWithQuestions, Account };
