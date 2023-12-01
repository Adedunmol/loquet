import * as crypto from "crypto"

export const encryptMessage = (message: string, password: string | null) => {

    if (!password) return { encryptedMessage: message, iv: null }

    const iv = crypto.randomBytes(12).toString("base64")

    const cipher = crypto.createCipheriv("aes-256-gcm", password, iv)

    let encryptedMessage = cipher.update(message, "utf-8", "base64")

    encryptedMessage += cipher.final("base64")

    const tag = cipher.getAuthTag()

    return { encryptedMessage, iv, tag }
}

export const decryptMessage = (message: string, secretKey: string, iv: string, tag: string) => {

    const decipher = crypto.createDecipheriv("aes-256-gcm", Buffer.from(secretKey, "base64"), Buffer.from(iv, "base64"))

    decipher.setAuthTag(Buffer.from(tag, "base64"))

    let decryptedMessage = decipher.update(message, "base64", "utf-8")

    decryptedMessage += decipher.final("utf-8")

    return decryptedMessage
}