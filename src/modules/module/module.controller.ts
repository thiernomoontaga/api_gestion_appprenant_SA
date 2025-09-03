import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import IModuleService from "./IModule.service.js";

export default abstract class BaseController<
  T,
  CreateDTO = T,
  UpdateDTO = Partial<T>
> {
  protected abstract service: IModuleService<T, CreateDTO, UpdateDTO>;

  protected abstract createSchema?: ZodSchema<CreateDTO>;
  protected abstract updateSchema?: ZodSchema<UpdateDTO>;

  protected abstract messages?: {
    created?: string;
    updated?: string;
    deleted?: string;
    notFound?: string;
  };

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data: CreateDTO = this.createSchema
        ? this.createSchema.parse(req.body)
        : (req.body as CreateDTO);

      const entity = await this.service.create(data);

      res.status(201).json({
        message: this.messages?.created,
        entity,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const entities = await this.service.findAll();
      res.status(200).json(entities);
    } catch (err) {
      next(err);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const entity = await this.service.findById(Number(id));

      if (!entity) {
        return res.status(404).json({
          error: this.messages?.notFound ?? "Non trouvé",
        });
      }

      res.status(200).json(entity);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data: UpdateDTO = this.updateSchema
        ? this.updateSchema.parse(req.body)
        : (req.body as UpdateDTO);

      const entity = await this.service.update(Number(id), data);

      res.status(200).json({
        message: this.messages?.updated,
        entity,
      });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.service.delete(Number(id));

      res.status(204).json({
        message: this.messages?.deleted,
      });
    } catch (err) {
      next(err);
    }
  }
}
