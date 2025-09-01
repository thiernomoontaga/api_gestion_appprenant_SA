import { z } from 'zod';
export declare const createProfilSchema: z.ZodObject<{
    libelle: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateProfilSchema: z.ZodObject<{
    libelle: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const profilParamsSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
export type CreateProfilDto = z.infer<typeof createProfilSchema>;
export type UpdateProfilDto = z.infer<typeof updateProfilSchema>;
export type ProfilParamsDto = z.infer<typeof profilParamsSchema>;
//# sourceMappingURL=profil.schema.d.ts.map