import { z } from "zod";
export const profilSortieSchema = z.object({
    libelle: z.string().min(2, "Le libellé doit contenir au moins 2 caractères"),
    description: z
        .string()
        .min(2, "La description doit contenir au moins 2 caractères"),
    referentielId: z
        .number()
        .int()
        .positive("referentielId doit être un entier positif"),
});
export const profilSortieUpdateSchema = profilSortieSchema.partial();
