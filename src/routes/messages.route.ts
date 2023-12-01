import { Router } from "express";
import { encryptNewMessage, decryptNewMessage } from "../controllers/messages.controller";

const router = Router();

router.post("/encrypt", encryptNewMessage)
router.post("/decrypt/:id", decryptNewMessage)

export default router;