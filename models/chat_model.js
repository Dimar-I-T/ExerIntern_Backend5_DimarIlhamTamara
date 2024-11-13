const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true
    },

    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    writtenAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Chat", ChatSchema);