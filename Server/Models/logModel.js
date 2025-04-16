const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'employee'],
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("notes", noteSchema);
