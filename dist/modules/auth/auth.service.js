"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
class AuthService {
    constructor() { }
    static getInstance() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }
    static async getProfilLibelle(user) {
        if (user.profil?.libelle)
            return user.profil.libelle;
        const profil = await prisma.profil.findUnique({
            where: { id: user.profilId },
        });
        return profil?.libelle;
    }
    static async getUserByEmail(email) {
        if (!email)
            return null;
        return await prisma.utilisateur.findFirst({
            where: { email },
        });
    }
    async authenticateUser(email, password) {
        const user = await prisma.utilisateur.findUnique({ where: { email } });
        if (!user)
            return null;
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return null;
        return user;
    }
}
exports.AuthService = AuthService;
