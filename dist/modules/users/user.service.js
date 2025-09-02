"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
class UserService {
    static async update(id, data) {
        const utilisateur = await prisma.utilisateur.findUnique({ where: { id } });
        if (!utilisateur)
            throw new Error("Utilisateur non trouvé");
        let updateData = { ...data };
        if (data.password && data.password !== utilisateur.password) {
            updateData.password = await bcrypt_1.default.hash(data.password, 10);
        }
        return await prisma.utilisateur.update({
            where: { id },
            data: updateData,
            include: { profil: true },
        });
    }
    static async partialUpdate(id, data) {
        const utilisateur = await prisma.utilisateur.findUnique({ where: { id } });
        if (!utilisateur)
            throw new Error("Utilisateur non trouvé");
        let updateData = { ...data };
        if (data.password) {
            updateData.password = await bcrypt_1.default.hash(data.password, 10);
        }
        return await prisma.utilisateur.update({
            where: { id },
            data: updateData,
            include: { profil: true },
        });
    }
    static async getAll() {
        return await prisma.utilisateur.findMany({ include: { profil: true } });
    }
    static async getById(id) {
        return await prisma.utilisateur.findUnique({
            where: { id },
            include: { profil: true },
        });
    }
    static async create(nom, prenom, email, login, password, profilId, statutUtilisateur = "ACTIF") {
        const existingUtilisateur = await prisma.utilisateur.findFirst({
            where: {
                OR: [{ email }, { login }],
            },
        });
        if (existingUtilisateur)
            throw new Error("Utilisateur existe déjà");
        const profil = await prisma.profil.findUnique({ where: { id: profilId } });
        if (!profil)
            throw new Error("Profil non trouvé");
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUtilisateur = await prisma.utilisateur.create({
            data: {
                nom,
                prenom,
                email,
                login,
                password: hashedPassword,
                profilId,
                statutUtilisateur,
            },
            include: {
                profil: true,
            },
        });
        return newUtilisateur;
    }
    static async delete(id) {
        const utilisateur = await prisma.utilisateur.findUnique({ where: { id } });
        if (!utilisateur)
            throw new Error("Utilisateur non trouvé");
        await prisma.utilisateur.delete({ where: { id } });
        return { message: "Utilisateur supprimé" };
    }
}
exports.default = UserService;
