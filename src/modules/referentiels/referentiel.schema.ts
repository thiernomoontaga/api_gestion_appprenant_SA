import { z } from "zod";

export const createReferentielSchema = z.object({
  libelle: z.string().min(1, "Le libellé est requis"),
  description: z.string().optional(),
  promotionId: z.number().int().positive("L'ID de promotion doit être un entier positif")
});

export const updateReferentielSchema = z.object({
  libelle: z.string().min(1, "Le libellé est requis").optional(),
  description: z.string().optional(),
  promotionId: z.number().int().positive("L'ID de promotion doit être un entier positif").optional()
});

export type CreateReferentielDto = z.infer<typeof createReferentielSchema>;
export type UpdateReferentielDto = z.infer<typeof updateReferentielSchema>;
