import { Router } from 'express';
import { UserController } from '../services/user.controller';
import { UserService } from '../services/user.service';
import { authenticate } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} from '../validators/user.validator';

const router = Router();
const userController = new UserController(new UserService());

router.post(
  '/register',
  validateRequest(registerSchema),
  userController.register
);
router.post('/login', validateRequest(loginSchema), userController.login);

// Protected routes
router.use(authenticate);
router.get('/profile', userController.getProfile);
router.patch(
  '/profile',
  validateRequest(updateProfileSchema),
  userController.updateProfile
);

export default router;
