"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilisateurService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
class UtilisateurService {
    static async getAllUtilisateurs(profile, statut) {
        const where = {};
        if (profile) {
            where.profileId = Number(profile);
        }
        if (statut) {
            where.statut = statut;
        }
        return await prisma.utilisateur.findMany({
            where,
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                login: true,
                statut: true,
                profile: {
                    select: {
                        id: true,
                        libelle: true
                    }
                }
            },
            orderBy: [
                { nom: 'asc' },
                { prenom: 'asc' }
            ]
        });
    }
    static async getUtilisateurById(id) {
        return await prisma.utilisateur.findUnique({
            where: { id },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                login: true,
                statut: true,
                profile: {
                    select: {
                        id: true,
                        libelle: true
                    }
                }
            }
        });
    }
    static async createUtilisateur(data) {
        const profile = await prisma.profiles.findUnique({
            where: { id: data.profileId }
        });
        if (!profile) {
            throw new Error('Le profil spécifié n\'existe pas');
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        return await prisma.utilisateur.create({
            data: {
                ...data,
                password: hashedPassword
            },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                login: true,
                statut: true,
                profile: {
                    select: {
                        id: true,
                        libelle: true
                    }
                }
            }
        });
    }
    static async updateUtilisateur(id, data) {
        const existingUtilisateur = await prisma.utilisateur.findUnique({
            where: { id }
        });
        if (!existingUtilisateur) {
            throw new Error('Utilisateur non trouvé');
        }
        if (data.profileId) {
            const profile = await prisma.profiles.findUnique({
                where: { id: data.profileId }
            });
            if (!profile) {
                throw new Error('Le profil spécifié n\'existe pas');
            }
        }
        const updateData = { ...data };
        if (data.password) {
            updateData.password = await bcrypt_1.default.hash(data.password, 10);
        }
        return await prisma.utilisateur.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                login: true,
                statut: true,
                profile: {
                    select: {
                        id: true,
                        libelle: true
                    }
                }
            }
        });
    }
    static async deleteUtilisateur(id) {
        const existingUtilisateur = await prisma.utilisateur.findUnique({
            where: { id }
        });
        if (!existingUtilisateur) {
            throw new Error('Utilisateur non trouvé');
        }
        await prisma.utilisateur.delete({
            where: { id }
        });
        return true;
    }
    static async updateStatutUtilisateur(id, statut) {
        return await prisma.utilisateur.update({
            where: { id },
            data: { statut },
            select: {
                id: true,
                nom: true,
                prenom: true,
                email: true,
                login: true,
                statut: true,
                profile: {
                    select: {
                        id: true,
                        libelle: true
                    }
                }
            }
        });
    }
    static async checkUtilisateurExists(id) {
        const utilisateur = await prisma.utilisateur.findUnique({
            where: { id }
        });
        return utilisateur !== null;
    }
}
exports.UtilisateurService = UtilisateurService;
//# sourceMappingURL=user.service.js.map