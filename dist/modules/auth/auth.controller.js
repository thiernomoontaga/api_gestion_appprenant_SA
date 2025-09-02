"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const auth_service_1 = require("./auth.service");
const jwt_service_1 = require("./jwt.service");
dotenv_1.default.config();
const authService = auth_service_1.AuthService.getInstance();
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
            const user = await authService.authenticateUser(email, password);
            if (!user) {
                return res.status(401).json({ message: "Identifiants invalides" });
            }
            const profilLibelle = await auth_service_1.AuthService.getProfilLibelle(user);
            const accessPayload = {
                email: user.email,
                nom: user.nom,
                prenom: user.prenom,
                profilLibelle,
            };
            const refreshPayload = { email: user.email };
            const accessToken = jwt_service_1.JwtService.sign(accessPayload, process.env.JWT_ACCESS_SECRET, { algorithm: "HS512", expiresIn: "2h" });
            const refreshToken = jwt_service_1.JwtService.sign(refreshPayload, process.env.JWT_REFRESH_SECRET, { algorithm: "HS512", expiresIn: "7d" });
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({ accessToken });
        }
        catch (error) {
            next(error);
        }
    }
    static async refreshToken(req, res) {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token manquant" });
        }
        try {
            const decoded = jwt_service_1.JwtService.verifyRefreshToken(refreshToken);
            const user = await auth_service_1.AuthService.getUserByEmail(decoded.email);
            if (!user) {
                return res.status(401).json({ message: "Utilisateur introuvable" });
            }
            const newAccessToken = jwt_service_1.JwtService.sign({
                email: user.email,
                nom: user.nom,
                prenom: user.prenom,
                profilLibelle: await auth_service_1.AuthService.getProfilLibelle(user),
            }, process.env.JWT_ACCESS_SECRET, { algorithm: "HS512", expiresIn: "15m" });
            return res.status(200).json({ accessToken: newAccessToken });
        }
        catch (err) {
            return res
                .status(401)
                .json({ message: "Refresh token invalide ou expiré" });
        }
    }
}
exports.AuthController = AuthController;
