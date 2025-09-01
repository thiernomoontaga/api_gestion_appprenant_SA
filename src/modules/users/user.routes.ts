import { Router } from "express";
import userController from "./user.controller";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userController.create);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.patch("/:id", userController.partialUpdate);
router.delete("/:id", userController.delete);

export default router;
