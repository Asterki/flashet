import React from "react";
import axios from "axios";

import { motion } from "framer-motion";

import "../../styles/accounts/register.scss";

const Register = () => {
	const [formError, setFormError] = React.useState("ewqe");

	const a = () => {
		setFormError("water");
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
				<div className="main">
					<div className="title">
						<img src="/svg/logo-black.svg" alt="Logo" />
						<h2>Flashet</h2>
					</div>

					<div className="form">
						<h2>Sign in</h2>
						<p>Create a Flashet account.</p>
						<br />

						<form action="/api/accounts/register">
							<label htmlFor="username">Username</label>
							<input required autoComplete="true" id="username-input" type="text" name="username" />

							<br />
							<br />
							<label htmlFor="email">Email</label>
							<input required autoComplete="true" id="email-input" type="email" name="email" />
							<br />
							<br />
							<label htmlFor="password">Password</label>
							<input required autoComplete="true" id="password-input" className="password-input" />
							<i></i>
						</form>
						<br />
						<br />
					</div>

					<div className="submit-button">
						<button type="submit" onClick={a}>
							Sign in
						</button>
						<p className="error">{formError}</p>
					</div>
				</div>

				<div className="footer">
					<p>By creating an account you agree to our Terms of Service and our Privacy Policy</p>
				</div>
			</motion.div>

			<div className="col-sm-12 col-md-12 col-lg-4 informative-col">
				<div className="main">
					<motion.img initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} src="/svg/logo-white.svg" alt="Logo" />
					<br />
					<h1>Flashet</h1>
					<p>Your new and free way of learning</p>
				</div>

				<div className="footer">Copyright © 2022-{new Date().getFullYear()} Flashet Inc</div>
			</div>
		</div>
	);
};

export default Register;
