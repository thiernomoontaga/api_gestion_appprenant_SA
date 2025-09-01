import { z } from 'zod';
export declare const StatutUtilisateurEnum: z.ZodEnum<{
    actif: "actif";
    abandon: "abandon";
    renvoyer: "renvoyer";
    decede: "decede";
    suspendu: "suspendu";
}>;
export declare const createUtilisateurSchema: z.ZodObject<{
    nom: z.ZodString;
    prenom: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    login: z.ZodString;
    statut: z.ZodDefault<z.ZodEnum<{
        actif: "actif";
        abandon: "abandon";
        renvoyer: "renvoyer";
        decede: "decede";
        suspendu: "suspendu";
    }>>;
    profileId: z.ZodNumber;
}, z.core.$strip>;
export declare const updateUtilisateurSchema: z.ZodObject<{
    nom: z.ZodOptional<z.ZodString>;
    prenom: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    login: z.ZodOptional<z.ZodString>;
    statut: z.ZodOptional<z.ZodEnum<{
        actif: "actif";
        abandon: "abandon";
        renvoyer: "renvoyer";
        decede: "decede";
        suspendu: "suspendu";
    }>>;
    profileId: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const utilisateurParamsSchema: z.ZodObject<{
    id: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
}, z.core.$strip>;
export type CreateUtilisateurDto = z.infer<typeof createUtilisateurSchema>;
export type UpdateUtilisateurDto = z.infer<typeof updateUtilisateurSchema>;
export type UtilisateurParamsDto = z.infer<typeof utilisateurParamsSchema>;
//# sourceMappingURL=user.schema.d.ts.map