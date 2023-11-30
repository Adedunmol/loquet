import { Router } from "express";
import { encryptNewMessage } from "../controllers/messages.controller";

const router = Router();

router.post("/encrypt", encryptNewMessage)

export default router;