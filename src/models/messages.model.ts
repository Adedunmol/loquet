import mongoose, { Schema } from "mongoose";

const messagesSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    iv: Buffer
})

export const Message = mongoose.model("Message", messagesSchema)