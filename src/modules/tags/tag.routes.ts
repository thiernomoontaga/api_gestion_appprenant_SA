import { Router } from "express";
import { TagController } from "./tag.controller";
import { validate } from "../../middlewares/validate";
import { createTagSchema, updateTagSchema } from "./tag.schema";

const router = Router();

// GET /tags - Récupérer tous les tags
router.get("/", TagController.getAllTags);

// GET /tags/:id - Récupérer un tag par ID
router.get("/:id", TagController.getTagById);

// POST /tags - Créer un nouveau tag
router.post("/", validate(createTagSchema), TagController.createTag);

// PUT /tags/:id - Mettre à jour un tag
router.put("/:id", validate(updateTagSchema), TagController.updateTag);

// DELETE /tags/:id - Supprimer un tag
router.delete("/:id", TagController.deleteTag);

export default router;
