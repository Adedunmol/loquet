import mongoose from "mongoose"


export const connectToDB = async (url: string) => {
    try {
        await mongoose.connect(url)
    } catch (e: any) {
        console.log(e)
    }
}