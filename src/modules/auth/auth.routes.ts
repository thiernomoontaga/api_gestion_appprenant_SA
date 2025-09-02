import { Router } from "express";
import { protectRoute } from "./auth.middleware";
import { authorize } from "./authorize";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login", AuthController.login);
// router.post("/register", AuthController.register);

router.post("/logout", AuthController.logout);
router.post("/refresh-token", AuthController.refreshToken);

export default router;
