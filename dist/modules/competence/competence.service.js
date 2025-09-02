"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetenceService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.CompetenceService = {
    async create(data) {
        return prisma.competence.create({ data });
    },
    async findAll() {
        return prisma.competence.findMany({
            include: {
                niveaux: true,
                tags: true,
            },
        });
    },
    async findById(id) {
        return prisma.competence.findUnique({
            where: { id },
            include: {
                niveaux: true,
                tags: true,
            },
        });
    },
    async update(id, data) {
        return prisma.competence.update({
            where: { id },
            data,
        });
    },
    async delete(id) {
        return prisma.competence.delete({
            where: { id },
        });
    },
};
