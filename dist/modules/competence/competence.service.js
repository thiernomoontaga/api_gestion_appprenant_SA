import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const CompetenceService = {
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
