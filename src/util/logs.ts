import chalk from "chalk";

const logSuccess = (message: any) => {
    console.log(`${chalk.greenBright("✓")} ${message}`);
};

const logWarning = (message: any) => {
    console.log(`${chalk.yellowBright("⚠")} ${message}`);
};

const logError = (message: any) => {
    console.log(`${chalk.redBright("⨯")} ${message}`);
};

const logLog = (message: any) => {
    console.log(`${chalk.whiteBright("○")} ${message}`);
};

export { logSuccess, logWarning, logError, logLog };
