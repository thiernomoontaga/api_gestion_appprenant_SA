import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { AuthService } from "./auth.service";
import { JwtService } from "./jwt.service";

dotenv.config();

const authService: AuthService = AuthService.getInstance();
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

      const user = await authService.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: "Identifiants invalides" });
      }

      const profilLibelle = await AuthService.getProfilLibelle(user);

      const accessPayload = {
        email: user.email,
        nom: user.nom,
        prenom: user.prenom,
        profilLibelle,
      };

      const refreshPayload = { email: user.email };

      const accessToken = JwtService.sign(
        accessPayload,
        process.env.JWT_ACCESS_SECRET as string,
        { algorithm: "HS512", expiresIn: "2h" }
      );

      const refreshToken = JwtService.sign(
        refreshPayload,
        process.env.JWT_REFRESH_SECRET as string,
        { algorithm: "HS512", expiresIn: "7d" }
      );

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }

  static async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token manquant" });
    }

    try {
      const decoded = JwtService.verifyRefreshToken(refreshToken);

      const user = await AuthService.getUserByEmail(decoded.email);
      if (!user) {
        return res.status(401).json({ message: "Utilisateur introuvable" });
      }

      const newAccessToken = JwtService.sign(
        {
          email: user.email,
          nom: user.nom,
          prenom: user.prenom,
          profilLibelle: await AuthService.getProfilLibelle(user),
        },
        process.env.JWT_ACCESS_SECRET as string,
        { algorithm: "HS512", expiresIn: "15m" }
      );

      return res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Refresh token invalide ou expiré" });
    }
  }
}
