import { NextFunction, Request, Response } from "express";

export default abstract  class BaseController<T> {
  protected abstract service: any;
  protected abstract createSchema?: any;
  protected abstract updateSchema?: any;
  protected abstract messages?: { created?: string; updated?: string; deleted?: string };

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = this.createSchema.parse(req.body);
      const entity = await this.service.create(data);
      res.status(201).json(entity);
    } catch (err: any) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response) {
    const entities = await this.service.findAll();
    res.status(200).json(entities);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const entity = await this.service.findById(Number(id));
    if (!entity) return res.status(404).json({ error: "Non trouvé" });
    res.status(200).json(entity);
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = this.updateSchema.parse(req.body);
      const entity = await this.service.update(Number(id), data);
      res.status(200).json(entity);
    } catch (err: any) {
      next(err);
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await this.service.delete(Number(id));
    res.status(204).send();
  }
}

