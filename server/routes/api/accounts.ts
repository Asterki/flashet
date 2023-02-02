import express from "express";
import rateLimit, { MemoryStore } from "express-rate-limit";

import { z } from "zod";
import validator from "validator";

import accountsService from "../../services/accounts";

const router = express.Router();

router.post(
	"/register",
	rateLimit({
		windowMs: 12 * 60 * 60 * 1000, // 12 hours
		max: 100, // TODO: Development only
		skipFailedRequests: true,
		statusCode: 429,
		store: new MemoryStore(),
	}),
	(req, res) => {
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

		const registeredUser = accountsService.registerUser(parsedBody.data);
		console.log(registeredUser);
	}
);

module.exports = router;
