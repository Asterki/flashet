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

const DeckSchema = new Schema({
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

export default mongoose.model(
    "DeckSchema",
    DeckSchema,
    "decks"
);
