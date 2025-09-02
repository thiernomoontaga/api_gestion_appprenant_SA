import type { Request, Response } from 'express';
import { z } from 'zod';
import { niveauParamsSchema, createNiveauSchema, updateNiveauSchema, niveauQuerySchema } from './niveau.schema';
import { NiveauService } from './niveau.service';

export class NiveauController {
  static async getAllNiveaux(req: Request, res: Response) {
    try {
      const queryOptions = niveauQuerySchema.parse(req.query);
      
      const result = await NiveauService.getAllNiveaux(queryOptions);
      
      return res.json({
        success: true,
        ...result,
        message: 'Niveaux récupérés avec succès'
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Paramètres de requête invalides',
          details: error.message
        });
      }
                                                                                                                                                                                                                                                                                                                                      









































       
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des niveaux',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  static async getNiveauById(req: Request, res: Response) {
    try {
      const { id } = niveauParamsSchema.parse(req.params);
      const niveau = await NiveauService.getNiveauById(id);
      
      if (!niveau) {
        return res.status(404).json({
          success: false,
          error: 'Niveau non trouvé'
        });
      }
      
      return res.json({
        success: true,
        data: niveau,
        message: 'Niveau récupéré avec succès'
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Paramètres invalides',
          details: error.message
        });
      }
      
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération du niveau',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  static async createNiveau(req: Request, res: Response) {
    try {
      const data = createNiveauSchema.parse(req.body);
      const niveau = await NiveauService.createNiveau(data);
      
      return res.status(201).json({
        success: true,
        data: niveau,
        message: 'Niveau créé avec succès'
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Données invalides',
          details: error.message
        });
      }
      
      if (error instanceof Error && error.message.includes('La compétence spécifiée n\'existe pas')) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      
      if (error instanceof Error && error.message.includes('Unique constraint')) {
        return res.status(409).json({
          success: false,
          error: 'Un niveau avec ces informations existe déjà'
        });
      }
      
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la création du niveau',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  static async updateNiveau(req: Request, res: Response) {
    try {
      const { id } = niveauParamsSchema.parse(req.params);
      const data = updateNiveauSchema.parse(req.body);
      
      const niveau = await NiveauService.updateNiveau(id, data);
      
      return res.json({
        success: true,
        data: niveau,
        message: 'Niveau mis à jour avec succès'
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Données invalides',
          details: error.message
        });
      }
      
      if (error instanceof Error && error.message.includes('Niveau non trouvé')) {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      
      if (error instanceof Error && error.message.includes('La compétence spécifiée n\'existe pas')) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      
      if (error instanceof Error && error.message.includes('Unique constraint')) {
        return res.status(409).json({
          success: false,
          error: 'Un niveau avec ces informations existe déjà'
        });
      }
      
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la mise à jour du niveau',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  static async deleteNiveau(req: Request, res: Response) {
    try {
      const { id } = niveauParamsSchema.parse(req.params);
      await NiveauService.deleteNiveau(id);
      
      return res.json({
        success: true,
        message: 'Niveau supprimé avec succès'
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Paramètres invalides',
          details: error.message
        });
      }
      
      if (error instanceof Error && error.message.includes('Niveau non trouvé')) {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la suppression du niveau',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  static async getNiveauxByCompetence(req: Request, res: Response) {
    try {
      const competenceParamsSchema = z.object({
        competenceId: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, {
          message: "L'ID de la compétence doit être un nombre positif"
        })
      });
      const { competenceId } = competenceParamsSchema.parse(req.params);
      
      const niveaux = await NiveauService.getNiveauxByCompetence(competenceId);
      
      return res.json({
        success: true,
        data: niveaux,
        message: 'Niveaux de la compétence récupérés avec succès'
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Paramètres invalides',
          details: error.message
        });
      }
      
      if (error instanceof Error && error.message.includes('La compétence spécifiée n\'existe pas')) {
        return res.status(404).json({
          success: false,
          error: error.message
        });
      }
      
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des niveaux',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }
}
