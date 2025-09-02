"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompetenceSchema = exports.createCompetenceSchema = void 0;
const zod_1 = require("zod");
exports.createCompetenceSchema = zod_1.z.object({
    libelle: zod_1.z.string().min(2, "Le libellé est obligatoire"),
    description: zod_1.z.string().optional(),
});
exports.updateCompetenceSchema = zod_1.z.object({
    libelle: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
