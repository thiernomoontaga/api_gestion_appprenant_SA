// src/controllers/competence.controller.ts
import { Request, Response } from "express";
import { CompetenceService } from "./competence.service.js";
import { createCompetenceSchema, updateCompetenceSchema } from "./competence.schema.js";

export class CompetenceController {
  static async create(req: Request, res: Response) {
    try {
      const data = createCompetenceSchema.parse(req.body);
      const competence = await CompetenceService.create(data);
      res.status(201).json(competence);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getAll(req: Request, res: Response) {
    const competences = await CompetenceService.findAll();
    res.status(200).json(competences);
  }

  static async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const competence = await CompetenceService.findById(Number(id));
    if (!competence) return res.status(404).json({ error: "Compétence introuvable" });
    res.status(200).json(competence);
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = updateCompetenceSchema.parse(req.body);
      const competence = await CompetenceService.update(Number(id), data);
      res.status(200).json(competence);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;
    await CompetenceService.delete(Number(id));
    res.status(204).send();
  }
}
