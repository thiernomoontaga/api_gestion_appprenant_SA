import { Router } from "express";
import { ReferentielController } from "./referentiel.controller";
import { validate } from "../../middlewares/validate";
import { createReferentielSchema, updateReferentielSchema } from "./referentiel.schema";

const router = Router();

// GET /referentiels - Récupérer tous les référentiels
router.get("/", ReferentielController.getAllReferentiels);

// GET /referentiels/:id/competences - Récupérer les compétences d'un référentiel (doit être avant /:id)
router.get("/:id/competences", ReferentielController.getCompetencesByReferentielId);

// GET /referentiels/:id - Récupérer un référentiel par ID
router.get("/:id", ReferentielController.getReferentielById);

// POST /referentiels - Créer un nouveau référentiel
router.post("/", validate(createReferentielSchema), ReferentielController.createReferentiel);

// PUT /referentiels/:id - Mettre à jour un référentiel
router.put("/:id", validate(updateReferentielSchema), ReferentielController.updateReferentiel);

// DELETE /referentiels/:id - Supprimer un référentiel
router.delete("/:id", ReferentielController.deleteReferentiel);

export default router;
