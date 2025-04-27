import { Router } from 'express';
import { UserController } from '../../../adapter/controllers/userController';

export function userRoutes(userController: UserController): Router {
  const router = Router();

  router.post('/', userController.createUser.bind(userController));
  
  return router;
}
