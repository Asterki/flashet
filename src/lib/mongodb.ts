import mongoose from "mongoose";
import { MongoClient } from "mongodb";

import { logError, logSuccess } from "@/util/logs";

if (!process.env.MONGODB_URI) {
    logError('Invalid/Missing environment variable: "MONGODB_URI"');
}
const uri = process.env.MONGODB_URI as string

// Connect to mongodb
mongoose.set("strictQuery", true);
mongoose.connect(uri);
const mongooseClient = mongoose.connection;

// Events for the mongoose client
mongooseClient.once("open", () => {
    logSuccess("MongoDB Successfully Connected");
});

mongooseClient.once("error", (error: Error) => {
    logError("There Was An Error With The Mongoose Client");
    console.log(error);
});


export { mongooseClient };