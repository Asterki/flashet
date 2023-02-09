import type { LangPack } from "../types/lang";

const en: LangPack = {
	isTemplate: false,
	main: {},
	accounts: {
		register: {
			pageTitle: "Flashet | Sign Up",

			title: "Flashet",
			form: {
				title: "Sign Up",
				subtitle: "Create a Flashet account",

				usernameLabel: "Username",
				usernamePlaceholder: "asterki",

				emailLabel: "Email",
				emailPlaceholder: "asterki@example.com",

				passwordLabel: "Password",
				passwordPlaceholder: "••••••••",

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
			pageTitle: "Flashet | Sign in",

			title: "Flashet",
			form: {
				title: "Sign in",
				subtitle: "Login to your Flashet account",

				emailOrUsernameLabel: "Your Email Or Username",
				emailOrUsernamePlaceholder: "asterki or asterki@example.com",

				passwordLabel: "Your Password",
				passwordPlaceholder: "••••••••",
				submitButton: "Login",

				noAccount: "Don't have an account? Sign up",
			},

			rightPanel: {
				title: "Flashet",
				subtitle: "Your new and free way of learning",
			},

			footer: "Flashet © 2023",

			errors: {
				"invalid-credentials": "Incorrect username/email or password",
				disabled: "Your account has been disabled for violation of our ToS",
				ratelimit: "You've tried logging in too many times, please try again later",
				"server-error": "An unexpected error happened, please try again later",

				"": "",
			},
		},
	},
};

export default en;
