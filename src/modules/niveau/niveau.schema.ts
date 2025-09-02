import { z } from 'zod';

export const createNiveauSchema = z.object({
  libelle: z.string()
    .min(1, "Le libellé est requis")
    .max(100, "Le libellé ne peut pas dépasser 100 caractères")
    .trim(),
  competenceId: z.number()
    .int("L'ID de la compétence doit être un entier")
    .positive("L'ID de la compétence doit être positif")
});

export const updateNiveauSchema = z.object({
  libelle: z.string()
    .min(1, "Le libellé est requis")
    .max(100, "Le libellé ne peut pas dépasser 100 caractères")
    .trim()
    .optional(),
  competenceId: z.number()
    .int("L'ID de la compétence doit être un entier")
    .positive("L'ID de la compétence doit être positif")
    .optional()
});

export const niveauParamsSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)).refine((val) => !isNaN(val) && val > 0, {
    message: "L'ID doit être un nombre positif"
  })
});

export type CreateNiveauDto = z.infer<typeof createNiveauSchema>;
export type UpdateNiveauDto = z.infer<typeof updateNiveauSchema>;
export type NiveauParamsDto = z.infer<typeof niveauParamsSchema>;
