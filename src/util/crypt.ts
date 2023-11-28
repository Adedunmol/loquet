import * as crypto from "crypto"

export const encryptMessage = (message: string, password: string) => {

    if (!password) return { encryptedMessage: message, iv: null }

    const iv = crypto.randomBytes(16)

    // const secretKey = password === "" ? crypto.randomBytes(32) : password

    const cipher = crypto.createCipheriv("aes-256-ccm", password, iv)

    let encryptedMessage = cipher.update(message, "utf-8", "hex")

    encryptedMessage += cipher.final("hex")

    return { encryptedMessage, iv }
}

export const decryptMessage = (message: string, secretKey: string, iv: string) => {

    const decipher = crypto.createDecipheriv("aes-256-ccm", secretKey, Buffer.from(iv))

    let decryptedMessage = decipher.update(message, "hex", "utf-8")

    decryptedMessage += decipher.final("utf-8")

    return decryptedMessage
}