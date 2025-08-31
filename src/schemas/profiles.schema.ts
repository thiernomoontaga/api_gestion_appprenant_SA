import { z } from 'zod';

export const createProfileSchema = z.object({
  libelle: z.string().min(1, "Le libellé est obligatoire").max(100),
});

export const updateProfileSchema = z.object({
  libelle: z.string().min(1).max(100).optional(),
});

export const profileParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "L'ID doit être un nombre").transform(Number),
});

export type CreateProfileDto = z.infer<typeof createProfileSchema>;
export type UpdateProfileDto = z.infer<typeof updateProfileSchema>;
export type ProfileParamsDto = z.infer<typeof profileParamsSchema>;