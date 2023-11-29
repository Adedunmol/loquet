require("dotenv").config()
import mongoose from "mongoose";
import app from "./app";
import { connectToDB } from "./config/dbConn";

connectToDB(process.env.DATABASE_URL!)

const PORT = process.env.PORT || 5000

mongoose.connection.once("open", () => {
    console.log("database connected")
    app.listen(PORT, () => {
        console.log(`server is listening on port ${PORT}`)
    })
})