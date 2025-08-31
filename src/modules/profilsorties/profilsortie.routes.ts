import { Router } from "express";
import profilSortieController from "./profilsortie.controller";

const router = Router();

router.get("/", profilSortieController.getAll);
router.post("/", profilSortieController.create);
router.get("/:id", profilSortieController.getById);
router.put("/:id", profilSortieController.update);
router.patch("/:id", profilSortieController.partialUpdate);
router.delete("/:id", profilSortieController.delete);

export default router;
