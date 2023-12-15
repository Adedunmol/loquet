import * as crypto from "crypto"

const key = "qwertyuiopasdfghjklzxcvbnmqwerty"
const iv = crypto.randomBytes(16)
const algorithm = "aes-256-cbc"

export const encryptMessage = (message: string, password: string | null) => {

    if (!password) return { encryptedMessage: message, iv: null }

    const iv = crypto.randomBytes(12).toString("base64")

    console.log("password", password.substring(0, 32))
    const cipher = crypto.createCipheriv(algorithm, password.substring(0, 32), iv)

    let encryptedMessage = cipher.update(message, "utf-8", "hex")

    encryptedMessage += cipher.final("hex")

    const newIV = Buffer.from(iv.toString(), "binary").toString("base64")

    return { encryptedMessage, newIV }
}

export const decryptMessage = (message: string, secretKey: string, iv: string) => {

    const originalData = Buffer.from(iv, "base64")

    console.log("working 1")

    console.log(secretKey.substring(0, 32))
    const decipher = crypto.createDecipheriv(algorithm, secretKey.substring(0, 32), originalData)

    console.log("working 2")

    let decryptedMessage = decipher.update(message, "base64", "utf-8")

    console.log("working 3")

    decryptedMessage += decipher.final("utf8")

    console.log("working 4")

    console.log(message)

    return decryptedMessage
}