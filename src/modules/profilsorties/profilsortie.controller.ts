import { Request, Response } from "express";
import profilSortieService from "./profilsortie.service";
import {
  profilSortieSchema,
  profilSortieUpdateSchema,
} from "./profilsortie.schema";

class ProfilSortieController {
  async getAll(_req: Request, res: Response) {
    try {
      const items = await profilSortieService.getAll();
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });
    try {
      const item = await profilSortieService.getById(id);
      if (!item) return res.status(404).json({ error: "Non trouvé" });
      res.json(item);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req: Request, res: Response) {
    const parseResult = profilSortieSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.issues });
    }
    try {
      const item = await profilSortieService.create(parseResult.data);
      res.status(201).json(item);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });
    const parseResult = profilSortieSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.issues });
    }
    try {
      const item = await profilSortieService.update(id, parseResult.data);
      res.json(item);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async partialUpdate(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });
    const parseResult = profilSortieUpdateSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.issues });
    }
    try {
      const item = await profilSortieService.update(id, parseResult.data);
      res.json(item);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: "ID invalide" });
    try {
      const result = await profilSortieService.delete(id);
      res.json(result);
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }
}

export default new ProfilSortieController();
