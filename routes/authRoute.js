import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { userSignupValidator } from '../helpers/validator/userSignupValidator.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', userSignupValidator, AuthController.registration);
router.post('/login',  AuthController.login);
router.post('/logout',  auth, AuthController.logout);
router.post('/change-password',  auth, AuthController.changePassword);

export default router;