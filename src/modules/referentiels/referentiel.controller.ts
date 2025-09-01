import { Request, Response } from "express";
import { ReferentielService } from "./referentiel.service";

export class ReferentielController {
  static async getAllReferentiels(req: Request, res: Response) {
    try {
      const referentiels = await ReferentielService.getAllReferentiels();
      res.json(referentiels);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des référentiels" });
    }
  }

  static async getReferentielById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const referentiel = await ReferentielService.getReferentielById(id);
      
      if (!referentiel) {
        return res.status(404).json({ error: "Référentiel non trouvé" });
      }
      
      res.json(referentiel);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération du référentiel" });
    }
  }

  static async createReferentiel(req: Request, res: Response) {
    try {
      const referentiel = await ReferentielService.createReferentiel(req.body);
      res.status(201).json(referentiel);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la création du référentiel" });
    }
  }

  static async updateReferentiel(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const referentiel = await ReferentielService.updateReferentiel(id, req.body);
      res.json(referentiel);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du référentiel" });
    }
  }

  static async deleteReferentiel(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await ReferentielService.deleteReferentiel(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression du référentiel" });
    }
  }

  static async getCompetencesByReferentielId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const competences = await ReferentielService.getCompetencesByReferentielId(id);
      res.json(competences);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des compétences" });
    }
  }
}
