import { Request, Response } from "express";
import { decryptMessage, encryptMessage } from "../util/crypt";
import * as bcrypt from "bcrypt";
import { Message } from "../models/messages.model";

export const encryptNewMessage = async (req: Request, res: Response) => {
    const { message, password } = req.body

    if (!message) return res.status(400)
                .json({ status: "error", data: null, message: "No message in the body of the request" })
    
    let hashedPassword = ""
    if (password) { 
        hashedPassword = await bcrypt.hash(password, 10)
    }

    const key = hashedPassword // the algorithm uses 32 bytes for encryption
    const { encryptedMessage, newIV } = encryptMessage(message, key)

    const data = await Message.create({ message: encryptedMessage, iv: newIV, password: hashedPassword })

    return res.status(201).json({ status: "success", data, message: null })
}

export const decryptNewMessage = async (req: Request, res: Response) => {
    const { id } = req.params
    const { password } = req.body

    if (!id) return res.status(400)
                    .json({ status: "error", data: null, message: "No id sent with the request" })

    if (!password) return res.status(400)
                    .json({ status: "error", data: null, message: "No password sent with the request" })
    
    const message = await Message.findById(id)

    if (!message) return res.status(404).json({ status: "error", data: null, message: "No message found with this id" })

    if (!message.iv) return res.status(200).json({ status: "success", data: message, message: null })

    const passwordsMatch = await bcrypt.compare(password, message.password!)

    if (!passwordsMatch) return res.status(200).json({ status: "success", data: null, message: "invalid password" })
    
    const decryptedMessage = decryptMessage(message.message, message.password!, message.iv)

    return res.status(200).json({ status: "success", data: decryptedMessage, message: null })
}