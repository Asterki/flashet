import mongoose from "mongoose";
const Schema = mongoose.Schema;

// # This schema is meant to keep data and preferences, the user schema already handles things like names and profile pictures
const AccountSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    lastLogin: {
        type: Date,
        required: false,
    },
    accountCreated: {
        type: Date,
        required: false,
    },
    emailVerified: {
        type: Boolean,
        required: false,
        default: false,
    },
});

export default mongoose.model("AccountSchema", AccountSchema, "accounts");
