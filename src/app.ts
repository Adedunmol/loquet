import express from "express";
import cors from "cors";
import messagesRouter from "./routes/messages.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/messsages", messagesRouter);

export default app;