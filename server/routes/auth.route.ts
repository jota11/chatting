import express from "express";
import { AuthController } from "../controllers/auth.ts";
import { protectRoute } from "../middleware/auth.ts";

const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

router.get("/check", protectRoute, AuthController.checkAuthentication);

export default router;
