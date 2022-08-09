import express from 'express';
import * as authController from '../controllers/authController.js';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/', authController.protect, userController.getAllUsers);

export default router;
