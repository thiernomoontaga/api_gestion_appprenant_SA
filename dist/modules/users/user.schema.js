"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPatchSchema = exports.userUpdateSchema = exports.userSchema = exports.profilSchema = void 0;
const zod_1 = require("zod");
exports.profilSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    libelle: zod_1.z.string().min(1),
});
exports.userSchema = zod_1.z.object({
    nom: zod_1.z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    prenom: zod_1.z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    email: zod_1.z.string().email("Email invalide"),
    login: zod_1.z.string().min(3, "Le login doit contenir au moins 3 caractères"),
    password: zod_1.z
        .string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    profilId: zod_1.z.number().int().positive("profilId doit être un entier positif"),
    statutUtilisateur: zod_1.z
        .enum(["DECEDE", "RENVOYER", "ACTIF", "ABANDONNER"])
        .default("ACTIF"),
});
exports.userUpdateSchema = zod_1.z.object({
    nom: zod_1.z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    prenom: zod_1.z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    email: zod_1.z.string().email("Email invalide"),
    login: zod_1.z.string().min(3, "Le login doit contenir au moins 3 caractères"),
    password: zod_1.z
        .string()
        .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    profilId: zod_1.z.number().int().positive("profilId doit être un entier positif"),
    statutUtilisateur: zod_1.z
        .enum(["DECEDE", "RENVOYER", "ACTIF", "ABANDONNER"])
        .default("ACTIF"),
});
exports.userPatchSchema = exports.userUpdateSchema.partial();
