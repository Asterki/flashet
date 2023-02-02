import mongoose from 'mongoose';
import chalk from 'chalk';

// Connect to mongodb
mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.MONGODB_URI as string,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    } as mongoose.ConnectOptions
);
const mongooseClient = mongoose.connection;

// Events for the mongoose client
mongooseClient.once('open', () => {
    console.log(`${chalk.cyan('Event')} - MongoDB database connected`);
});

mongooseClient.once('error', (error: Error) => {
    console.log(
        `${chalk.red(
            'Error'
        )} - There was an error trying to connect to MongoDB`
    );
    console.error(error);
});

export { mongooseClient };
