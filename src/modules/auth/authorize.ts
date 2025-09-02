// Middleware d'autorisation RBAC
import { Request, Response, NextFunction } from "express";
import { hasPermission, Action } from "./rbac";


interface AuthRequest extends Request {
  user?: {
    profilLibelle?: string; 
  };
}

export const authorize = (ressource: string, action: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user || !user.profilLibelle) {
      return res.status(401).json({ message: "Non authentifié" });
    }
    if (!hasPermission(user.profilLibelle, ressource, action as Action)) {
      return res.status(403).json({ message: "Accès refusé" });
    }
    next();
  };
};
