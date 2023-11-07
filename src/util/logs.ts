import chalk from "chalk";

const logSuccess = (message: any) => {
    console.log(` ${chalk.bold(chalk.greenBright("✓"))} ${message}`);
};

const logWarning = (message: any) => {
    console.log(` ${chalk.bold(chalk.yellowBright("⚠"))} ${message}`);
};

const logError = (message: any) => {
    console.log(` ${chalk.bold(chalk.redBright("⨯"))} ${message}`);
};

const logLog = (message: any) => {
    console.log(` ${chalk.bold(chalk.whiteBright("○"))} ${message}`);
};

export { logSuccess, logWarning, logError, logLog };
