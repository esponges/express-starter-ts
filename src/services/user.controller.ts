import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { BaseController } from './base.controller';

export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super(userService);
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { user, token } = await this.userService.createUser(req.body);
      res.status(201).json({
        success: true,
        data: { user, token },
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.login(email, password);
      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new Error('User ID not found in request');
      }

      const user = await this.userService.updateUser(userId, req.body);
      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        throw new Error('User ID not found in request');
      }

      const user = await this.userService.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const { password, ...userWithoutPassword } = user;
      res.json({
        success: true,
        data: userWithoutPassword,
      });
    } catch (error) {
      next(error);
    }
  };
}
