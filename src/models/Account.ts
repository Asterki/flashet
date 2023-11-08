import mongoose from "mongoose";
const Schema = mongoose.Schema;

// # This schema is meant to keep data and preferences, the user schema already handles things like names and profile pictures
const Accounts = new Schema({
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
    likedAccounts: {
        type: String,
        required: false,
    },
    emailVerified: {
        type: Boolean,
        required: false,
        default: false,
    },
});

// So that models don't get overwritten
const model = mongoose.models.Accounts || mongoose.model("Accounts", Accounts, "accounts");
export default model;
