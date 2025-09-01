"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProfilService {
    static async getAllProfils() {
        return await prisma.profiles.findMany({
            orderBy: {
                libelle: 'asc'
            }
        });
    }
    static async getProfilById(id) {
        return await prisma.profiles.findUnique({
            where: { id }
        });
    }
    static async createProfil(data) {
        return await prisma.profiles.create({
            data
        });
    }
    static async updateProfil(id, data) {
        return await prisma.profiles.update({
            where: { id },
            data
        });
    }
    static async deleteProfil(id) {
        return await prisma.profiles.delete({
            where: { id }
        });
    }
    static async checkProfilExists(id) {
        const profil = await prisma.profiles.findUnique({
            where: { id }
        });
        return profil !== null;
    }
    static async checkProfilUsage(id) {
        const utilisateurs = await prisma.utilisateur.count({
            where: { profileId: id }
        });
        return utilisateurs > 0;
    }
}
exports.ProfilService = ProfilService;
//# sourceMappingURL=profil.service.js.map