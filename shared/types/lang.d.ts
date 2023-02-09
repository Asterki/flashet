interface LangPack {
	isTemplate: boolean;
	main: {};
	accounts: {
		register: {
			pageTitle: string;

			title: string;

			form: {
				title: string;
				subtitle: string;

				usernameLabel: string;
				usernamePlaceholder: string;

				emailLabel: string;
				emailPlaceholder: string;

				passwordLabel: string;
				passwordPlaceholder: string;

				submitButton: string;
				alreadyRegistered: string;
			};

			rightPanel: {
				title: string;
				subtitle: string;
			};

			footer: string;

			errors: {
				"invalid-username-length": string;
				"invalid-email": string;
				"invalid-password-length": string;

				"username-email-in-use": string;

				ratelimit: string;
				"server-error": string;

				"": "";
			};
		};
		login: {
			pageTitle: string;

			title: string;

			form: {
				title: string;
				subtitle: string;

				emailOrUsernameLabel: string;
				emailOrUsernamePlaceholder: string;

				passwordLabel: string;
				passwordPlaceholder: string;

				submitButton: string;
				noAccount: string;
			};

			rightPanel: {
				title: string;
				subtitle: string;
			};

			footer: string;

			errors: {
				"invalid-credentials": string;
				"disabled": string;
				"ratelimit": string;
                "server-error": string;
                
				"": "";
			};
		};
	};
}

export type { LangPack };
