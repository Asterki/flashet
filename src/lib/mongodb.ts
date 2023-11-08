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


// # The mongo client for auth is separated from the regular operations mongo client
const options = {}
let client;
let authDBClientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri, options);
        (global as any)._mongoClientPromise = client.connect();
    }
    authDBClientPromise = (global as any)._mongoClientPromise;
} else {
    // In production mode, it's best to not use a (global as any) variable.
    client = new MongoClient(uri, options);
    authDBClientPromise = client.connect();
}

export { mongooseClient, authDBClientPromise };
