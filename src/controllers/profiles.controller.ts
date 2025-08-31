import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { 
  createProfileSchema, 
  updateProfileSchema, 
  profileParamsSchema,
  CreateProfileDto,
  UpdateProfileDto 
} from '../schemas/profiles.schema';

const prisma = new PrismaClient();

export class ProfilesController {
  // GET /profiles - Récupérer tous les profils
  static async getAllProfiles(req: Request, res: Response) {
    try {
      const profiles = await prisma.profiles.findMany({
        include: {
          _count: {
            select: { utilisateurs: true }
          }
        },
        orderBy: { libelle: 'asc' }
      });

      res.json({
        success: true,
        data: profiles,
        message: 'Profils récupérés avec succès'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des profils',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  // GET /profiles/:id - Récupérer un profil par ID
  static async getProfileById(req: Request, res: Response) {
    try {
      const { id } = profileParamsSchema.parse(req.params);

      const profile = await prisma.profiles.findUnique({
        where: { id },
        include: {
          utilisateurs: {
            select: {
              id: true,
              nom: true,
              prenom: true,
              email: true,
              login: true,
              statut: true
            }
          },
          _count: {
            select: { utilisateurs: true }
          }
        }
      });

      if (!profile) {
        return res.status(404).json({
          success: false,
          error: 'Profil non trouvé'
        });
      }

      return res.json({
        success: true,
        data: profile,
        message: 'Profil récupéré avec succès'
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
        error: 'Erreur lors de la récupération du profil',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  // POST /profiles - Créer un nouveau profil
  static async createProfile(req: Request, res: Response) {
    try {
      const data: CreateProfileDto = createProfileSchema.parse(req.body);

      const profile = await prisma.profiles.create({
        data,
        include: {
          _count: {
            select: { utilisateurs: true }
          }
        }
      });

      return res.status(201).json({
        success: true,
        data: profile,
        message: 'Profil créé avec succès'
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Données invalides',
          details: error.message
        });
      }

      // Gestion de l'erreur de contrainte unique
      if (error instanceof Error && error.message.includes('Unique constraint')) {
        return res.status(409).json({
          success: false,
          error: 'Un profil avec ce libellé existe déjà'
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la création du profil',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  // PUT /profiles/:id - Mettre à jour un profil
  static async updateProfile(req: Request, res: Response) {
    try {
      const { id } = profileParamsSchema.parse(req.params);
      const data: UpdateProfileDto = updateProfileSchema.parse(req.body);

      // Vérifier si le profil existe
      const existingProfile = await prisma.profiles.findUnique({
        where: { id }
      });

      if (!existingProfile) {
        return res.status(404).json({
          success: false,
          error: 'Profil non trouvé'
        });
      }

      const profile = await prisma.profiles.update({
        where: { id },
        data,
        include: {
          _count: {
            select: { utilisateurs: true }
          }
        }
      });

      return res.json({
        success: true,
        data: profile,
        message: 'Profil mis à jour avec succès'
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Données invalides',
          details: error.message
        });
      }

      if (error instanceof Error && error.message.includes('Unique constraint')) {
        return res.status(409).json({
          success: false,
          error: 'Un profil avec ce libellé existe déjà'
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la mise à jour du profil',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  // DELETE /profiles/:id - Supprimer un profil
  static async deleteProfile(req: Request, res: Response) {
    try {
      const { id } = profileParamsSchema.parse(req.params);

      // Vérifier si le profil existe
      const existingProfile = await prisma.profiles.findUnique({
        where: { id },
        include: {
          _count: {
            select: { utilisateurs: true }
          }
        }
      });

      if (!existingProfile) {
        return res.status(404).json({
          success: false,
          error: 'Profil non trouvé'
        });
      }

      // Vérifier s'il y a des utilisateurs associés
      if (existingProfile._count.utilisateurs > 0) {
        return res.status(409).json({
          success: false,
          error: 'Impossible de supprimer ce profil car il est utilisé par des utilisateurs'
        });
      }

      await prisma.profiles.delete({
        where: { id }
      });

      return res.json({
        success: true,
        message: 'Profil supprimé avec succès'
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
        error: 'Erreur lors de la suppression du profil',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }
}