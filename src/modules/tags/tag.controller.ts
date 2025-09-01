import { Request, Response } from "express";
import { TagService } from "./tag.service";

export class TagController {
  static async getAllTags(req: Request, res: Response) {
    try {
      const tags = await TagService.getAllTags();
      res.json(tags);
    } catch (error) {
      console.error("Erreur tags:", error);
      res.status(500).json({ error: "Erreur lors de la récupération des tags", details: error.message });
    }
  }

  static async getTagById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const tag = await TagService.getTagById(id);
      
      if (!tag) {
        return res.status(404).json({ error: "Tag non trouvé" });
      }
      
      res.json(tag);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération du tag" });
    }
  }

  static async createTag(req: Request, res: Response) {
    try {
      const tag = await TagService.createTag(req.body);
      res.status(201).json(tag);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la création du tag" });
    }
  }

  static async updateTag(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const tag = await TagService.updateTag(id, req.body);
      res.json(tag);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour du tag" });
    }
  }

  static async deleteTag(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await TagService.deleteTag(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression du tag" });
    }
  }
}
