"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Exemple de config DB (Prisma)
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = prisma;
