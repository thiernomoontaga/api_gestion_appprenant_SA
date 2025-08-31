import { z } from 'zod';

export const StatutUtilisateurEnum = z.enum(['actif', 'abandon', 'renvoyer', 'decede', 'suspendu']);

export const createUtilisateurSchema = z.object({
  nom: z.string().min(1, "Le nom est obligatoire").max(100),
  prenom: z.string().min(1, "Le prénom est obligatoire").max(100),
  email: z.string().email("Format email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  login: z.string().min(3, "Le login doit contenir au moins 3 caractères").max(50),
  statut: StatutUtilisateurEnum.default('actif'),
  profileId: z.number().int().positive("L'ID du profil doit être positif"),
});

export const updateUtilisateurSchema = z.object({
  nom: z.string().min(1).max(100).optional(),
  prenom: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  login: z.string().min(3).max(50).optional(),
  statut: StatutUtilisateurEnum.optional(),
  profileId: z.number().int().positive().optional(),
});

export const utilisateurParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "L'ID doit être un nombre").transform(Number),
});

export type CreateUtilisateurDto = z.infer<typeof createUtilisateurSchema>;
export type UpdateUtilisateurDto = z.infer<typeof updateUtilisateurSchema>;
export type UtilisateurParamsDto = z.infer<typeof utilisateurParamsSchema>;