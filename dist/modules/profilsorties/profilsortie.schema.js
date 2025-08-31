"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilSortieUpdateSchema = exports.profilSortieSchema = void 0;
const zod_1 = require("zod");
exports.profilSortieSchema = zod_1.z.object({
    libelle: zod_1.z.string().min(2, "Le libellé doit contenir au moins 2 caractères"),
    description: zod_1.z
        .string()
        .min(2, "La description doit contenir au moins 2 caractères"),
    referentielId: zod_1.z
        .number()
        .int()
        .positive("referentielId doit être un entier positif"),
});
exports.profilSortieUpdateSchema = exports.profilSortieSchema.partial();
