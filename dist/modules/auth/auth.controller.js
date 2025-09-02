"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = require("./auth.service");
dotenv_1.default.config();
class AuthController {
    static async logout(req, res) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return res.status(200).json({ message: "Déconnexion réussie" });
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res
                    .status(400)
                    .json({ message: "Email et mot de passe requis" });
            }
            const authService = new auth_service_1.AuthService();
            const user = await authService.authenticateUser(email, password);
            if (!user) {
                return res.status(401).json({ message: "Identifiants invalides" });
            }
            let profilLibelle = undefined;
            if (user.profil && user.profil.libelle) {
                profilLibelle = user.profil.libelle;
            }
            else {
                const prisma = require("@prisma/client");
                const prismaClient = new prisma.PrismaClient();
                const profil = await prismaClient.profil.findUnique({
                    where: { id: user.profilId },
                });
                profilLibelle = profil?.libelle;
                await prismaClient.$disconnect();
            }
            const payload = {
                email: user.email,
                nomComplet: user.nom + " " + user.prenom,
                profilLibelle,
            };
            const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
                algorithm: "HS512",
                expiresIn: "2h",
            });
            const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
                algorithm: "HS512",
                expiresIn: "7d",
            });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res
                .status(200)
                .json({ user: { ...user, profilLibelle }, accessToken });
        }
        catch (error) {
            next(error);
        }
    }
    // Endpoint pour rafraîchir le token d'accès
    static async refreshToken(req, res) {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token manquant" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET, { algorithms: ["HS512"] });
            // On retire les champs iat, exp du payload
            const { iat, exp, ...payload } = decoded;
            const accessToken = jsonwebtoken_1.default.sign(payload, process.env.JWT_ACCESS_SECRET, {
                algorithm: "HS512",
                expiresIn: "15m",
            });
            return res.status(200).json({ accessToken });
        }
        catch (err) {
            return res
                .status(401)
                .json({ message: "Refresh token invalide ou expiré" });
        }
    }
    static async register(req, res, next) {
        // À implémenter : logique d'inscription
        res.status(501).json({ message: "Non implémenté" });
    }
}
exports.AuthController = AuthController;
