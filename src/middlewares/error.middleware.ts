// src/middlewares/error.middleware.ts
// Middleware de manejo global de errores. Captura cualquier error no
// resuelto en controladores o middlewares anteriores y responde con
// un formato JSON consistente, en vez de romper el servidor o
// devolver la página HTML de error por defecto de Express.

import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Un JSON mal formado en el body (por ejemplo, falta una comilla)
  // llega hasta acá como SyntaxError, generado por el parser de
  // Express antes de que cualquier controlador reciba la petición.
  // Es un error del cliente, no del servidor: no corresponde 500.
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({
      status: 'error',
      message: 'El cuerpo de la petición no es un JSON válido',
    });
    return;
  }

  console.error(err);

  res.status(500).json({
    status: 'error',
    message: 'Ocurrió un error inesperado en el servidor',
  });
}