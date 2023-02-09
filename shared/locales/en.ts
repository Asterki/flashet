import type { LangPack } from "../types/lang";

const en: LangPack = {
	isTemplate: false,
	main: {},
	accounts: {
		register: {
			pageTitle: "Flashet | Register",

			title: "Flashet",
			form: {
				title: "Sign in",
				subtitle: "Create a Flashet account",

				usernameLabel: "Username",
				usernamePlaceholder: "asterki",

				emailLabel: "Email",
				emailPlaceholder: "asterki@example.com",

				passwordLabel: "Password",
				passwordPlaceholder: "········",

				submitButton: "Sign in",
				alreadyRegistered: "Already have an account? Sign in",
			},

			rightPanel: {
				title: "Flashet",
				subtitle: "Your new and free way of learning",
			},

			footer: "Flashet © 2023",

			errors: {
				"invalid-email": "Please enter a valid email",
				"invalid-password-length": "Passwords must be between 6 and 64 characters",
				"invalid-username-length": "Usernames must be between 3 and 24 characters",

				"username-email-in-use": "The username/email you've entered is already in use",

				ratelimit: "You've already created an account recently, please try again later",
				"server-error": "An unexpected error happened, please try again later",

				"": "",
			},
		},
		login: {
			pageTitle: "Flashet | Login",
		},
	},
};

export default en;
