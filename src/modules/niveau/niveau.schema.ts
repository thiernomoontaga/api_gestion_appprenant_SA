import { z } from 'zod';
<<<<<<< HEAD
import { paginationQuerySchema, searchQuerySchema } from '../../utils/pagination';
import { sortQuerySchema } from '../../utils/sorting';
=======
>>>>>>> a1a232da56c46924a716dd547014a552125c5dcd

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

<<<<<<< HEAD
export const niveauQuerySchema = paginationQuerySchema
  .merge(searchQuerySchema)
  .merge(sortQuerySchema)
  .extend({
    competenceId: z.string()
      .optional()
      .transform((val) => val ? parseInt(val, 10) : undefined)
      .refine((val) => val === undefined || (val > 0), {
        message: "L'ID de compétence doit être un nombre positif"
      })
  });

export const NIVEAU_SORTABLE_FIELDS = ['id', 'libelle'] as const;

export type CreateNiveauDto = z.infer<typeof createNiveauSchema>;
export type UpdateNiveauDto = z.infer<typeof updateNiveauSchema>;
export type NiveauParamsDto = z.infer<typeof niveauParamsSchema>;
export type NiveauQueryDto = z.infer<typeof niveauQuerySchema>;
=======
export type CreateNiveauDto = z.infer<typeof createNiveauSchema>;
export type UpdateNiveauDto = z.infer<typeof updateNiveauSchema>;
export type NiveauParamsDto = z.infer<typeof niveauParamsSchema>;
>>>>>>> a1a232da56c46924a716dd547014a552125c5dcd
