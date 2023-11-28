import mongoose, { Schema } from "mongoose";

const messagesSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    password: String,
    iv: Buffer
})

export const Message = mongoose.Model<typeof messagesSchema>