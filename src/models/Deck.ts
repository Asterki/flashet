import mongoose from "mongoose";
const Schema = mongoose.Schema;

const questionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["basic", "choice", "fill"],
        required: true,
    },
    front: {
        type: String,
        required: true,
    },
    back: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
});

const Decks = new Schema({
    name: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    questionStatus: {
        new: {
            type: Number,
            required: true,
        },
        studying: {
            type: Number,
            required: true,
        },
        done: {
            type: Number,
            required: true,
        },
    },
    options: {
        random: {
            type: Boolean,
            required: true,
        },
        timeLimit: {
            type: Boolean,
            required: true,
        },
        timeLimitMS: {
            type: Number,
            required: false,
            default: 30000,
        },
    },
    questions: [questionSchema],
});

// So that models don't get overwritten
const model = mongoose.models.Decks || mongoose.model("Decks", Decks, "decks");
export default model;
