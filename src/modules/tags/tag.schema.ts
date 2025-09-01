import { z } from "zod";

export const createTagSchema = z.object({
  libelle: z.string().min(1, "Le libellé est requis"),
  description: z.string().optional(),
  competenceId: z.number().int().positive("L'ID de compétence doit être un entier positif")
});

export const updateTagSchema = z.object({
  libelle: z.string().min(1, "Le libellé est requis").optional(),
  description: z.string().optional(),
  competenceId: z.number().int().positive("L'ID de compétence doit être un entier positif").optional()
});

export type CreateTagDto = z.infer<typeof createTagSchema>;
export type UpdateTagDto = z.infer<typeof updateTagSchema>;
