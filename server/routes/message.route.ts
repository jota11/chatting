import express from "express";
import { protectRoute } from "../middleware/auth.ts";
import { getMessages, getMessage, sendMessage } from "../controllers/messages.ts";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.get("/message/:id", protectRoute, getMessage);

router.post("/send/:id", protectRoute, sendMessage)

export default router;
