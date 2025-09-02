import { Router } from "express";
import profilSortieController from "./profilsortie.controller";
import { authorize } from "../auth/authorize";

const router = Router();

router.get(
  "/",
  authorize("profilsortie", "read"),
  profilSortieController.getAll.bind(profilSortieController)
);
router.post(
  "/",
  authorize("profilsortie", "create"),
  profilSortieController.create.bind(profilSortieController)
);
router.get(
  "/:id",
  authorize("profilsortie", "read"),
  profilSortieController.getById.bind(profilSortieController)
);
router.put(
  "/:id",
  authorize("profilsortie", "update"),
  profilSortieController.update.bind(profilSortieController)
);
router.patch(
  "/:id",
  authorize("profilsortie", "update"),
  profilSortieController.partialUpdate.bind(profilSortieController)
);
router.delete(
  "/:id",
  authorize("profilsortie", "delete"),
  profilSortieController.delete.bind(profilSortieController)
);

export default router;
