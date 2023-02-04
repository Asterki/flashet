import passport from "passport";
import passportLocal from "passport-local";
import expressSession from "express-session";
import mongoStore from "connect-mongo";
import express from "express";
import bcrypt from 'bcrypt'

import UserModel from "../models/user";
import { app } from "../index";

import { UserAccount } from "../../shared/types/models";

// For authentication on each request
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

// Cookie session
app.use(
	expressSession({
		secret: process.env.SESSION_SECRET as string,
		resave: false,
		saveUninitialized: true,
		store: mongoStore.create({
			mongoUrl: process.env.MONGODB_URI as string,
		}),
		name: "session",
		cookie: {
			secure: (process.env.COOKIE_SECURE as string) == "true",
			maxAge: parseInt(process.env.COOKIE_MAX_AGE as string) || 604800000,
			sameSite: true,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Auth Strategy
passport.use(
	new passportLocal.Strategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
			session: true,
		},
		async (req: express.Request, _email: string, _password: string, done: any) => {
			try {
				const user: UserAccount | null = await UserModel.findOne({
					$or: [{ "email.value": req.body.email }, { username: req.body.email }],
				});

				if (!user) return done(null, false, "invalid-credentials");

				if (!bcrypt.compareSync(req.body.password, user.password)) return done(null, false, "invalid-credentials");
				if (user.banned == true) return done(null, false, "disabled");

				return done(null, user);
			} catch (err) {
				return done(err);
			}
		}
	)
);

// Service methods
const registerUser = async (userData: { username: string; email: string; password: string }) => {
	// Check if username and email (must be unique values) are not in use
	const usernameOrEmailInUseResult = await UserModel.findOne({
		$or: [{ username: userData.username }, { email: userData.email }],
	});

	if (usernameOrEmailInUseResult !== null) return "in-use";

	// Generate a user ID, TODO: Check if the id is in use, which would be pretty imposible, but it could crash the app in given case
	const userID = Math.round(Math.random() * 1000000000000);

	// Create the user with the required values, the rest of values are automatically set by the schema
	const user = new UserModel({
		userID: userID,
		createdAt: Date.now(),

		username: userData.username,
		email: {
			value: userData.email,
		},

		password: userData.password,
	});

	await user.save();
	return user;
};

const serviceMethods = {
	registerUser,
};

export default serviceMethods;
