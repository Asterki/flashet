/* eslint-disable @typescript-eslint/no-var-requires */
import chalk from "chalk";

import { app } from "../index";

try {
    // Routes
	app.use("/api/accounts", require("./api/accounts"));
	console.log(`${chalk.cyan("Event")} - The routes were successfully loaded`);

    // Middleware
	require("./middleware/helmet");
	console.log(`${chalk.cyan("Event")} - The middleware was successfully loaded`);
} catch (err: unknown) {
	console.log(`${chalk.red("Error")} - There was an error loading the routes`);
	console.error(err);
}

export {};
