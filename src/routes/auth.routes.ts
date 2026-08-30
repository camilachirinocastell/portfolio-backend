// src/routes/auth.routes.ts
// Define las rutas HTTP de autenticación y las conecta con su
// controlador correspondiente.

import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router = Router();
const controller = new AuthController();

// POST /users/register — crea la cuenta de administradora.
router.post('/register', (req, res) => controller.register(req, res));

// POST /users/login — verifica credenciales y devuelve un token JWT.
router.post('/login', (req, res) => controller.login(req, res));

export default router;