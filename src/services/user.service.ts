import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db';
import { config } from '../config';
import { IUserCreate, IUserUpdate } from '../types/user.types';
import { ApiError } from '../middlewares/error.middleware';
import { BaseService } from './base.service';

export class UserService extends BaseService {
  constructor() {
    super(db.users);
  }

  async createUser(userData: IUserCreate) {
    const existingUser = await db.users.findOne({ email: userData.email });
    if (existingUser) {
      throw new ApiError(409, 'Email already in use');
    }

    const salt = await bcrypt.genSalt(config.saltRounds);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = await db.users.create({
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const token = this.generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  async login(email: string, password: string) {
    const user = await db.users.findOne({ email });
    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const token = this.generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  async updateUser(id: string, updateData: IUserUpdate) {
    if (updateData.email) {
      const existingUser = await db.users.findOne({ email: updateData.email });
      if (existingUser && existingUser.id !== id) {
        throw new ApiError(409, 'Email already in use');
      }
    }

    const user = await db.users.update(id, updateData);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private generateToken(user: any): string {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: '24h',
    });
  }
}
