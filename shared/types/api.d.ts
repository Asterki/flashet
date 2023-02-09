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
type AccountsRegisterResponse = "ratelimit" | "username-email-in-use" | "server-error" | "ok";

interface AccountsLoginRequest {
	emailOrUsername: string;
	password: string;
}

type AccountsLoginResponse = "invalid-credentials" | "disabled" | "server-error" | "success";

export type { PagesLanguageResponse, AccountsRegisterRequest, AccountsRegisterResponse, AccountsLoginRequest, AccountsLoginResponse };
