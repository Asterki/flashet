import { LangPack } from "./lang";

// Pages
interface PagesLanguageResponse {
	lang: LangPack;
}

// Accounts
interface AccountsRegisterRequest {
	username: string;
	email: string;
	password: string;
}
type AccountsRegisterResponse = "ratelimit" | "username-email-in-use" | "server-error" | "success";

interface AccountsLoginRequest {
	emailOrUsername: string;
	password: string;
}

interface AccountsLoginRequest {
    emailOrUsernameInput: string;
    password: string;
}
type AccountsLoginResponse = "invalid-credentials" | "disabled" | "server-error" | "ratelimit" | "success";

export type { PagesLanguageResponse, AccountsRegisterRequest, AccountsRegisterResponse, AccountsLoginRequest, AccountsLoginResponse };
