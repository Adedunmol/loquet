import { Router } from "express";
import { createNewMessage } from "../controllers/messages.controller";

const router = Router();

router.post("/", createNewMessage)

export default router;