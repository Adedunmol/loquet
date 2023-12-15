import mongoose, { Schema } from "mongoose";

const messagesSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    iv: {
        type: String,
        required: true
    },
    password: String
})

export const Message = mongoose.model("Message", messagesSchema)