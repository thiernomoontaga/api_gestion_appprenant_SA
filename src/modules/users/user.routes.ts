import { Router } from "express";
import UserController from "./user.controller";
import { authorize } from "../auth/authorize";

const router = Router();

router.get(
  "/utilisateurs",
  authorize("utilisateur", "read"),
  UserController.getAll
);
router.post(
  "/utilisateurs",
  authorize("utilisateur", "create"),
  UserController.create
);

// Protéger toutes les routes REST par le RBAC
router.get("/", authorize("utilisateur", "read"), UserController.getAll);
router.post("/", authorize("utilisateur", "create"), UserController.create);
router.get("/:id", authorize("utilisateur", "read"), UserController.getById);
router.put("/:id", authorize("utilisateur", "update"), UserController.update);
router.patch(
  "/:id",
  authorize("utilisateur", "update"),
  UserController.partialUpdate
);
router.delete(
  "/:id",
  authorize("utilisateur", "delete"),
  UserController.delete
);

export default router;
