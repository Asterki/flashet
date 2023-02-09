import express from "express";
import passport from "passport";
import rateLimit, { MemoryStore } from "express-rate-limit";

import { z } from "zod";
import validator from "validator";

import accountsService from "../../services/accounts";
import { UserAccount } from "../../../shared/types/models";

import { AccountsRegisterResponse, AccountsLoginResponse } from "../../../shared/types/api";

const router = express.Router();

router.post(
	"/register",
	rateLimit({
		windowMs: 12 * 60 * 60 * 1000, // 12 hours
		max: 100, // TODO: Development only
		skipFailedRequests: true,
		statusCode: 200,
		message: "ratelimit" as AccountsRegisterResponse,
		store: new MemoryStore(),
	}),
	async (req, res) => {
		try {
			const parsedBody = z
				.object({
					username: z
						.string()
						.min(3, {
							message: "invalid-username-length",
						})
						.max(16, {
							message: "invalid-username-length",
						})
						.refine(
							(username) => {
								return validator.isAlphanumeric(username, "en-GB", {
									ignore: "._",
								});
							},
							{
								message: "invalid-username",
							}
						),
					email: z.string().refine(validator.isEmail, {
						message: "invalid-email",
					}),
					password: z.string().min(4, { message: "invalid-password-length" }).max(256, { message: "invalid-password-length" }),
				})
				.required()
				.safeParse(req.body);

			if (!parsedBody.success) return res.status(400);

			const registeredUser = await accountsService.registerUser(parsedBody.data);
			if (registeredUser == "in-use") return res.send("username-email-in-use" as AccountsRegisterResponse);

			// Login the user
			req.logIn(registeredUser, (err: unknown) => {
				if (err) throw err;
				return res.send("success" as AccountsRegisterResponse);
			});
		} catch (err: unknown) {
			return res.send("server-error" as AccountsRegisterResponse);
		}
	}
);

router.post(
	"/login",
	rateLimit({
		windowMs: 1000 * 60 * 60,
		max: 10,
		statusCode: 200,
		message: "ratelimit",
	}),
	(req: express.Request, res: express.Response, next: express.NextFunction) => {
		const parsedBody = z
			.object({
				email: z.string(),
				password: z.string(),
			})
			.required()
			.safeParse(req.body);

		if (!parsedBody.success) return res.status(400);

		try {
			passport.authenticate("local", (err: Error | null, user: UserAccount, result: string) => {
				if (err) throw err;
				if (!user) return res.status(200).send(result as "invalid-credentials" | "disabled" as AccountsLoginResponse);

				// Login the user
				req.logIn(user, (err) => {
					if (err) throw err;
					return res.status(200).send("success" as AccountsLoginResponse);
				});
			})(req, res, next);
		} catch (err: unknown) {
			return res.send("server-error" as AccountsRegisterResponse);
		}
	}
);

module.exports = router;
