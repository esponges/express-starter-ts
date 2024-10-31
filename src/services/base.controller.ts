import { Request, Response, NextFunction } from 'express';
import { BaseService } from '../services/base.service';
import { ApiError } from '../middlewares/error.middleware';

export abstract class BaseController {
  constructor(protected service: BaseService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const items = await this.service.findAll();
      res.json({ success: true, data: items });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.findById(req.params.id);
      if (!item) {
        throw new ApiError(404, 'Item not found');
      }
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.create(req.body);
      res.status(201).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.update(req.params.id, req.body);
      if (!item) {
        throw new ApiError(404, 'Item not found');
      }
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.delete(req.params.id);
      if (!item) {
        throw new ApiError(404, 'Item not found');
      }
      res.json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  };
}
