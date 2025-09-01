import { z } from "zod";

export const createProfileSchema = z.object({
  libelle: z.string().min(2, "Le libellé doit contenir au moins 2 caractères"),
});

export const updateProfileSchema = z.object({
  libelle: z.string().min(2, "Le libellé doit contenir au moins 2 caractères").optional(),
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;