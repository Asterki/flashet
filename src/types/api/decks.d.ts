import type { DeckType } from "../models";

type DecksSaveRequestBody = DeckType;
interface DecksSaveResponse {
    message:
        | "success"
        | "method-not-allowed"
        | "invalid-parameters"
        | "not-logged-in";
}

export type { DecksSaveRequestBody, DecksSaveResponse }