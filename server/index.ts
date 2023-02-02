import express from "express";
import http from "http";
import cors from "cors";

import * as dotenv from "dotenv";
import chalk from "chalk";
import path from "path";

const app = express();
const server = http.createServer(app);

dotenv.config({
	path: path.join(__dirname, process.env.NODE_ENV === "production" ? "../../.env.local" : "../.env.local"),
});

try {
	app.use(express());
	app.use(
		cors({
			origin: process.env.FRONTEND_URL as string,
		})
	);

	require("./services/databases");
	// require('./services/accounts');
	require("./routes/router");

	// If the server runs on production mode, it will also serve the react files
	if (process.env.NODE_ENV === "production") {
		app.use(express.static(path.join(__dirname, "../client")));

		app.get("*", (req, res) => {
			res.send(path.join(__dirname, "../client/index.html"));
		});
	}

	app.listen(process.env.SERVER_PORT || 8080, () => {
		console.log(
			`${chalk.green("Success")} - The server is listening on ${process.env.NODE_ENV === "development" ? "development" : "production"} mode on port ${
				process.env.SERVER_PORT || 8080
			}`
		);
	});
} catch (err: unknown) {
	console.log(`${chalk.red("Error")} - There was an error launching the app`);
	console.error(err);
}

export { app, server };
