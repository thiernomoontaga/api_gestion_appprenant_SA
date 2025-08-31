"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.default = {
    getAll: async () => {
        return await prisma.profilSortie.findMany({
            include: { referentiel: true },
        });
    },
    getById: async (id) => {
        return await prisma.profilSortie.findUnique({
            where: { id },
            include: { referentiel: true },
        });
    },
    create: async (data) => {
        return await prisma.profilSortie.create({
            data,
            include: { referentiel: true },
        });
    },
    update: async (id, data) => {
        return await prisma.profilSortie.update({
            where: { id },
            data,
            include: { referentiel: true },
        });
    },
    delete: async (id) => {
        await prisma.profilSortie.delete({ where: { id } });
        return { message: "ProfilSortie supprimé" };
    },
};
