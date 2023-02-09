// * This file was created to generate new language files
// * and to be a "default" language before the actual language loads
import type { LangPack } from "../types/lang";

const template: LangPack = {
	isTemplate: true,
	main: {},
	accounts: {
		register: {
			pageTitle: "",

			title: "",
			form: {
				title: "",
				subtitle: "",

				usernameLabel: "",
				usernamePlaceholder: "",

				emailLabel: "",
				emailPlaceholder: "",

				passwordLabel: "",
				passwordPlaceholder: "",
				submitButton: "",

				alreadyRegistered: "",
			},

			rightPanel: {
				subtitle: "",
				title: "",
			},

			footer: "",

			errors: {
				"invalid-email": "",
				"invalid-password-length": "",
				"invalid-username-length": "",

				"username-email-in-use": "",

				ratelimit: "",
				"server-error": "",

				"": "",
			},
		},
		login: {
			pageTitle: "",

			title: "",
			form: {
				title: "",
				subtitle: "",

				emailOrUsernameLabel: "",
				emailOrUsernamePlaceholder: "",

				passwordLabel: "",
				passwordPlaceholder: "",
				submitButton: "",

				noAccount: "",
			},

			rightPanel: {
				subtitle: "",
				title: "",
			},

			footer: "",

			errors: {
				"invalid-credentials": "",
				disabled: "",
				ratelimit: "",
                "server-error": "",

				"": "",
			},
		},
	},
};

export default template;
