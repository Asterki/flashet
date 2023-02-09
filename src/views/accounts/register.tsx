import React from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import { RootState } from "../../store/index";

import axios, { AxiosResponse } from "axios";
import validator from "validator";

import "../../styles/accounts/register.scss";
import { AccountsRegisterRequest, AccountsRegisterResponse } from "../../../shared/types/api";
import { LangPack } from "../../../shared/types/lang";

const Register = () => {
	// Navigation
	const navigate = useNavigate();

	// Store
	const appState = useSelector((state: RootState) => state);
	const lang = appState.page.lang.accounts.register;

	// State
	const [formError, setFormError] = React.useState("" as keyof LangPack["accounts"]["register"]["errors"]);
	const [showingPassword, setShowingPassword] = React.useState(false);

	// Refs
	const usernameInput = React.useRef("" as unknown as HTMLInputElement);
	const emailInput = React.useRef("" as unknown as HTMLInputElement);
	const passwordInput = React.useRef("" as unknown as HTMLInputElement);

	// When the submit button is clicked
	const submitForm = async () => {
		// Checks
		if (!validator.isEmail(emailInput.current.value)) return setFormError("invalid-email");
		if (usernameInput.current.value.length < 2 || usernameInput.current.value.length > 24) return setFormError("invalid-username-length");
		if (passwordInput.current.value.length < 6 || passwordInput.current.value.length > 64) return setFormError("invalid-password-length");

		try {
			// Send the request
			const response: AxiosResponse<AccountsRegisterResponse> = await axios({
				url: `${import.meta.env.VITE_SERVER_URL}/api/accounts/register`,
				method: "POST",
				data: {
					username: usernameInput.current.value,
					email: emailInput.current.value,
					password: passwordInput.current.value,
				} as AccountsRegisterRequest,
			});

			if (response.data !== "success") return setFormError(response.data);
			else navigate("/home");
		} catch (err: unknown) {
			setFormError("server-error");
		}
	};

	return (
		<div className="page row">
			<motion.div
				initial={{ opacity: 0, y: -100 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					y: { duration: 1 },
					opacity: { duration: 1 },
					default: { ease: "easeInOut" },
				}}
				className="col-sm-12 col-md-12 col-lg-8 form-col"
			>
				<Helmet>
					<title>{lang.pageTitle}</title>
				</Helmet>

				<div className="main">
					<div className="title">
						<img src="/svg/logo-black.svg" alt="Logo" />
						<h2>{lang.title}</h2>
					</div>

					<div className="form">
						<h2>{lang.form.title}</h2>
						<p>{lang.form.subtitle}</p>
						<br />

						<form action="/api/accounts/register">
							<label htmlFor="username">{lang.form.usernameLabel}</label>
							<input
								required
								autoComplete="true"
								id="username-input"
								ref={usernameInput}
								placeholder={lang.form.usernamePlaceholder}
								type="text"
								name="username"
							/>

							<br />
							<br />

							<label htmlFor="email">{lang.form.emailLabel}</label>
							<input required autoComplete="true" id="email-input" ref={emailInput} placeholder={lang.form.emailPlaceholder} type="email" name="email" />

							<br />
							<br />

							<label htmlFor="password">{lang.form.passwordLabel}</label>
							<input
								required
								autoComplete="true"
								id="password-input"
								ref={passwordInput}
								placeholder={lang.form.passwordPlaceholder}
								type={showingPassword ? "text" : "password"}
								className="password-input"
							/>
							<i
								className={`${showingPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} password-visibility-switch`}
								onClick={() => {
									setShowingPassword(!showingPassword);
								}}
							></i>
						</form>
						<br />
						<br />
					</div>

					<div className="submit-button">
						<button type="submit" onClick={submitForm}>
							{lang.form.submitButton}
						</button>
						<p className="error">{lang.errors[formError]}</p>
						<br />
						<br />
						<Link to="/login">{lang.form.alreadyRegistered}</Link>
					</div>
				</div>

				<div className="footer">
					<p>{lang.footer}</p>
				</div>
			</motion.div>

			<div className="col-sm-12 col-md-12 col-lg-4 informative-col">
				<div className="main">
					<motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} src="/svg/logo-white.svg" alt="Logo" />
					<br />
					<h1>{lang.rightPanel.title}</h1>
					<p>{lang.rightPanel.subtitle}</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
