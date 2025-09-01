"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profilParamsSchema = exports.updateProfilSchema = exports.createProfilSchema = void 0;
const zod_1 = require("zod");
exports.createProfilSchema = zod_1.z.object({
    libelle: zod_1.z.string().min(1, "Le libellé est obligatoire").max(100),
    description: zod_1.z.string().optional(),
});
exports.updateProfilSchema = zod_1.z.object({
    libelle: zod_1.z.string().min(1).max(100).optional(),
    description: zod_1.z.string().optional(),
});
exports.profilParamsSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^\d+$/, "L'ID doit être un nombre").transform(Number),
});
//# sourceMappingURL=profil.schema.js.map