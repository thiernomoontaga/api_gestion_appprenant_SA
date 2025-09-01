import { z } from "zod";

export const profilSchema = z.object({
  id: z.number().int().positive(),
  libelle: z.string().min(1),
});

export const userSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  login: z.string().min(3, "Le login doit contenir au moins 3 caractères"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  profilId: z.number().int().positive("profilId doit être un entier positif"),
  statutUtilisateur: z
    .enum(["DECEDE", "RENVOYER", "ACTIF", "ABANDONNER"])
    .default("ACTIF"),
});

export const userUpdateSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  login: z.string().min(3, "Le login doit contenir au moins 3 caractères"),
  password: z
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  profilId: z.number().int().positive("profilId doit être un entier positif"),
  statutUtilisateur: z
    .enum(["DECEDE", "RENVOYER", "ACTIF", "ABANDONNER"])
    .default("ACTIF"),
});

export const userPatchSchema = userUpdateSchema.partial();

export type UserInput = z.infer<typeof userSchema>;
export type ProfilInput = z.infer<typeof profilSchema>;
