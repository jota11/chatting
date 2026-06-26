import express from "express";
import { protectRoute } from "../middleware/auth.ts";
import { getUsersFromSidebar } from "../controllers/messages.ts";

const router = express.Router();

router.get("/users", protectRoute, getUsersFromSidebar);
// router.get("/:id", protectRoute, getUsersFromSidebar);

export default router;
