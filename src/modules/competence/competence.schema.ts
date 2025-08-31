import { z } from "zod";

export const createCompetenceSchema = z.object({
  libelle: z.string().min(2, "Le libellé est obligatoire"),
  description: z.string().optional(),
});

export const updateCompetenceSchema = z.object({
  libelle: z.string().optional(),
  description: z.string().optional(),
});

export type CreateCompetenceInput = z.infer<typeof createCompetenceSchema>;
export type UpdateCompetenceInput = z.infer<typeof updateCompetenceSchema>;
