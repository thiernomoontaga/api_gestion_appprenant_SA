import { Request, Response } from 'express';
import { PrismaClient, StatutUtilisateur, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { 
  createUtilisateurSchema, 
  updateUtilisateurSchema, 
  utilisateurParamsSchema,
  CreateUtilisateurDto,
  UpdateUtilisateurDto 
} from '../schemas/utilisateur.schema';

const prisma = new PrismaClient();

export class UtilisateurController {
  static async getAllUtilisateurs(req: Request, res: Response) {
    try {
      const { profile, statut } = req.query;

      //Damay préparé bén objet vide qui servira de filtre pour ma requête Prisma sur la table Utilisateur.
      const where: Prisma.UtilisateurWhereInput = {};
      
      if (profile && typeof profile === 'string') {
        where.profileId = Number(profile);
      }
      
      if (statut && typeof statut === 'string') {
        where.statut = statut as StatutUtilisateur;
      }

      const utilisateurs = await prisma.utilisateur.findMany({
        where,
        select: {
          id: true,
          nom: true,
          prenom: true,
          email: true,
          login: true,
          statut: true,
          profile: {
            select: {
              id: true,
              libelle: true
            }
          }
        },
        orderBy: [
          { nom: 'asc' },
          { prenom: 'asc' }
        ]
      });

      return res.json({
        success: true,
        data: utilisateurs,
        message: 'Utilisateurs récupérés avec succès'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la récupération des utilisateurs',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  static async getUtilisateurById(req: Request, res: Response) {
    try {
      const { id } = utilisateurParamsSchema.parse(req.params);

      const utilisateur = await prisma.utilisateur.findUnique({
        where: { id },
        select: {
          id: true,
          nom: true,
          prenom: true,
          email: true,
          login: true,
          statut: true,
          profile: {
            select: {
              id: true,
              libelle: true
            }
          }
        }
      });

      if (!utilisateur) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }

      return res.json({
        success: true,
        data: utilisateur,
        message: 'Utilisateur récupéré avec succès'
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
        error: 'Erreur lors de la récupération de l\'utilisateur',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  static async createUtilisateur(req: Request, res: Response) {
    try {
      const data: CreateUtilisateurDto = createUtilisateurSchema.parse(req.body);

      // Vérifier si le profil existe
      const profile = await prisma.profiles.findUnique({
        where: { id: data.profileId }
      });

      if (!profile) {
        return res.status(400).json({
          success: false,
          error: 'Le profil spécifié n\'existe pas'
        });
      }

      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const utilisateur = await prisma.utilisateur.create({
        data: {
          ...data,
          password: hashedPassword
        },
        select: {
          id: true,
          nom: true,
          prenom: true,
          email: true,
          login: true,
          statut: true,
          profile: {
            select: {
              id: true,
              libelle: true
            }
          }
        }
      });

      return res.status(201).json({
        success: true,
        data: utilisateur,
        message: 'Utilisateur créé avec succès'
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Données invalides',
          details: error.message
        });
      }

      // Gestion des erreurs de contrainte unique (email ou login)
      if (error instanceof Error && error.message.includes('Unique constraint')) {
        if (error.message.includes('email')) {
          return res.status(409).json({
            success: false,
            error: 'Un utilisateur avec cet email existe déjà'
          });
        }
        if (error.message.includes('login')) {
          return res.status(409).json({
            success: false,
            error: 'Un utilisateur avec ce login existe déjà'
          });
        }
        return res.status(409).json({
          success: false,
          error: 'Un utilisateur avec ces informations existe déjà'
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la création de l\'utilisateur',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  static async updateUtilisateur(req: Request, res: Response) {
    try {
      const { id } = utilisateurParamsSchema.parse(req.params);
      const data: UpdateUtilisateurDto = updateUtilisateurSchema.parse(req.body);

      // Vérifier si l'utilisateur existe
      const existingUtilisateur = await prisma.utilisateur.findUnique({
        where: { id }
      });

      if (!existingUtilisateur) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }

      // Si un nouveau profil est spécifié, vérifier qu'il existe
      if (data.profileId) {
        const profile = await prisma.profiles.findUnique({
          where: { id: data.profileId }
        });

        if (!profile) {
          return res.status(400).json({
            success: false,
            error: 'Le profil spécifié n\'existe pas'
          });
        }
      }

      // Hash du nouveau mot de passe si fourni
      const updateData = { ...data };
      if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
      }

      const utilisateur = await prisma.utilisateur.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          nom: true,
          prenom: true,
          email: true,
          login: true,
          statut: true,
          profile: {
            select: {
              id: true,
              libelle: true
            }
          }
        }
      });

      return res.json({
        success: true,
        data: utilisateur,
        message: 'Utilisateur mis à jour avec succès'
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
        if (error.message.includes('email')) {
          return res.status(409).json({
            success: false,
            error: 'Un utilisateur avec cet email existe déjà'
          });
        }
        if (error.message.includes('login')) {
          return res.status(409).json({
            success: false,
            error: 'Un utilisateur avec ce login existe déjà'
          });
        }
      }

      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la mise à jour de l\'utilisateur',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  static async deleteUtilisateur(req: Request, res: Response) {
    try {
      const { id } = utilisateurParamsSchema.parse(req.params);

      // Vérifier si l'utilisateur existe
      const existingUtilisateur = await prisma.utilisateur.findUnique({
        where: { id }
      });

      if (!existingUtilisateur) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }

      await prisma.utilisateur.delete({
        where: { id }
      });

      return res.json({
        success: true,
        message: 'Utilisateur supprimé avec succès'
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
        error: 'Erreur lors de la suppression de l\'utilisateur',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  static async updateStatutUtilisateur(req: Request, res: Response) {
    try {
      const { id } = utilisateurParamsSchema.parse(req.params);
      const { statut } = req.body;

      if (!['actif', 'abandon', 'renvoyer', 'decede', 'suspendu'].includes(statut)) {
        return res.status(400).json({
          success: false,
          error: 'Statut invalide. Valeurs acceptées: actif, abandon, renvoyer, decede, suspendu'
        });
      }

      const utilisateur = await prisma.utilisateur.update({
        where: { id },
        data: { statut },
        select: {
          id: true,
          nom: true,
          prenom: true,
          email: true,
          login: true,
          statut: true,
          profile: {
            select: {
              id: true,
              libelle: true
            }
          }
        }
      });

      return res.json({
        success: true,
        data: utilisateur,
        message: 'Statut utilisateur mis à jour avec succès'
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('Record to update not found')) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé'
        });
      }

      return res.status(500).json({
        success: false,
        error: 'Erreur lors de la mise à jour du statut',
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }
}