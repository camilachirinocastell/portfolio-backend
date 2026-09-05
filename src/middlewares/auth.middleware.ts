// src/middlewares/auth.middleware.ts
// Verifica que la petición incluya un token JWT válido en la cabecera
// Authorization antes de dejarla continuar hacia rutas protegidas.

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      status: 'error',
      message: 'Falta el token de autenticación',
    });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, ENV.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({
      status: 'error',
      message: 'Token inválido o expirado',
    });
  }
}