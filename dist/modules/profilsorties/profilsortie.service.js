"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class ProfilSortieService {
    constructor(prismaClient) {
        this.prisma = prismaClient || new client_1.PrismaClient();
    }
    async getAll() {
        return this.prisma.profilSortie.findMany({
            include: { referentiel: true },
        });
    }
    async getById(id) {
        return this.prisma.profilSortie.findUnique({
            where: { id },
            include: { referentiel: true },
        });
    }
    async create(data) {
        return this.prisma.profilSortie.create({
            data,
            include: { referentiel: true },
        });
    }
    async update(id, data) {
        return this.prisma.profilSortie.update({
            where: { id },
            data,
            include: { referentiel: true },
        });
    }
    async delete(id) {
        await this.prisma.profilSortie.delete({ where: { id } });
        return { message: "ProfilSortie supprimé" };
    }
}
const profilSortieService = new ProfilSortieService();
exports.default = profilSortieService;
