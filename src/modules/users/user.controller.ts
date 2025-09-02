import { Request, Response } from "express";
import UserService from "./user.service";
import { userSchema, userUpdateSchema, userPatchSchema } from "./user.schema";

class UserController {
  static async getAll(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }
    try {
      const user = await UserService.getById(id);
      if (!user)
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }
    const parseResult = userUpdateSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.issues });
    }
    try {
      const user = await UserService.update(id, parseResult.data);
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async partialUpdate(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }
    const parseResult = userPatchSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.issues });
    }
    try {
      const user = await UserService.partialUpdate(id, parseResult.data);
      res.json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async create(req: Request, res: Response) {
    const parseResult = userSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.issues });
    }
    try {
      const {
        nom,
        prenom,
        email,
        login,
        password,
        profilId,
        statutUtilisateur,
      } = parseResult.data;
      const user = await UserService.create(
        nom,
        prenom,
        email,
        login,
        password,
        profilId,
        statutUtilisateur
      );
      res.status(201).json(user);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID invalide" });
    }
    try {
      const result = await UserService.delete(id);
      res.json(result);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default UserController;
