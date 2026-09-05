// src/middlewares/validate.middleware.ts
// Fábrica de middlewares de validación: recibe un esquema Zod y
// devuelve un middleware que valida req.body contra ese esquema
// antes de dejar pasar la petición al controlador.

import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';

export function validate(schema: ZodType) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({
        status: 'error',
        message: 'Datos inválidos',
        errors: error.issues.map((issue: any) => ({
          field: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }
  };
}