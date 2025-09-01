"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utilisateurParamsSchema = exports.updateUtilisateurSchema = exports.createUtilisateurSchema = exports.StatutUtilisateurEnum = void 0;
const zod_1 = require("zod");
exports.StatutUtilisateurEnum = zod_1.z.enum(['actif', 'abandon', 'renvoyer', 'decede', 'suspendu']);
exports.createUtilisateurSchema = zod_1.z.object({
    nom: zod_1.z.string().min(1, "Le nom est obligatoire").max(100),
    prenom: zod_1.z.string().min(1, "Le prénom est obligatoire").max(100),
    email: zod_1.z.string().email("Format email invalide"),
    password: zod_1.z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    login: zod_1.z.string().min(3, "Le login doit contenir au moins 3 caractères").max(50),
    statut: exports.StatutUtilisateurEnum.default('actif'),
    profileId: zod_1.z.number().int().positive("L'ID du profil doit être positif"),
});
exports.updateUtilisateurSchema = zod_1.z.object({
    nom: zod_1.z.string().min(1).max(100).optional(),
    prenom: zod_1.z.string().min(1).max(100).optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(6).optional(),
    login: zod_1.z.string().min(3).max(50).optional(),
    statut: exports.StatutUtilisateurEnum.optional(),
    profileId: zod_1.z.number().int().positive().optional(),
});
exports.utilisateurParamsSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, "L'ID doit être un nombre").transform(Number),
});
//# sourceMappingURL=user.schema.js.map