// src/controllers/auth.controller.ts
// Recibe las peticiones HTTP de registro e inicio de sesión, llama a
// AuthService y traduce sus resultados (o errores) a respuestas HTTP.

import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';

const authService = new AuthService();

export class AuthController {
  // POST /users/register
  async register(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const newUser = await authService.register(email, password);

      res.status(201).json({
        status: 'success',
        message: 'Usuario administrador registrado exitosamente',
        data: newUser,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'EMAIL_ALREADY_REGISTERED') {
        res.status(409).json({
          status: 'error',
          message: 'Ya existe un usuario registrado con ese email',
        });
        return;
      }

      throw error;
    }
  }

  // POST /users/login
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const token = await authService.login(email, password);

      res.status(200).json({
        status: 'success',
        message: 'Inicio de sesión exitoso',
        token,
        expiresIn: '2h',
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
        res.status(401).json({
          status: 'error',
          message: 'Email o contraseña incorrectos',
        });
        return;
      }

      throw error;
    }
  }
}