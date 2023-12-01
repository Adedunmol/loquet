import mongoose, { Schema } from "mongoose";

const messagesSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    iv: String,
    tag: String
})

export const Message = mongoose.model("Message", messagesSchema)