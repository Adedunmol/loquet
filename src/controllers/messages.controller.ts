import { Request, Response } from "express";
import { encryptMessage } from "../util/crypt";
import * as bcrypt from "bcrypt";
import { Message } from "../models/messages.model";

export const createNewMessage = async (req: Request, res: Response) => {
    const { message, password } = req.body

    if (!message) return res.status(400)
                .json({ status: "error", data: null, message: "No message in the body of the request" })

    const { encryptedMessage, iv } = encryptMessage(message, password)
    
    let hashedPassword = ""
    if (password) { 
        hashedPassword = await bcrypt.hash(password, 10)
    }

    const data = await Message.create({ message: encryptedMessage, password: hashedPassword, iv: iv })

    return res.status(201).json({ status: "success", data, message: null })
}