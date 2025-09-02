import { Request, Response, NextFunction } from "express";

import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { AuthService } from "./auth.service";
dotenv.config();

export class AuthController {
  static async logout(req: Request, res: Response) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Déconnexion réussie" });
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email et mot de passe requis" });
      }
      const authService = new AuthService();
      const user = await authService.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: "Identifiants invalides" });
      }

      let profilLibelle = undefined;
      if ((user as any).profil && (user as any).profil.libelle) {
        profilLibelle = (user as any).profil.libelle;
      } else {
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
      const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET as string,
        {
          algorithm: "HS512",
          expiresIn: "2h",
        }
      );
      const refreshToken = jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET as string,
        {
          algorithm: "HS512",
          expiresIn: "7d",
        }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res
        .status(200)
        .json({ user: { ...user, profilLibelle }, accessToken });
    } catch (error) {
      next(error);
    }
  }

  // Endpoint pour rafraîchir le token d'accès
  static async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token manquant" });
    }
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
        { algorithms: ["HS512"] }
      );
      // On retire les champs iat, exp du payload
      const { iat, exp, ...payload } = decoded as any;
      const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET as string,
        {
          algorithm: "HS512",
          expiresIn: "15m",
        }
      );
      return res.status(200).json({ accessToken });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Refresh token invalide ou expiré" });
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    // À implémenter : logique d'inscription
    res.status(501).json({ message: "Non implémenté" });
  }
}
