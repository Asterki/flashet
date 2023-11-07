import { logError, logSuccess } from "@/util/logs";
import mongoose from "mongoose";

// Connect to mongodb
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI as string);
const mongooseClient = mongoose.connection;

// Events for the mongoose client
mongooseClient.once("open", () => {
    logSuccess("MongoDB Successfully Connected");
});

mongooseClient.once("error", (error: Error) => {
    logError("There Was An Error With The Mongoose Client")
    console.log(error);
});

export { mongooseClient };
