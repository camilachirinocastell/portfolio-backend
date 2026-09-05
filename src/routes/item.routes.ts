// src/routes/item.routes.ts
// Define las rutas HTTP del catálogo de servicios y las conecta con
// su controlador. Las rutas de escritura están protegidas: requieren
// un token JWT válido y, salvo DELETE, un body que cumpla su esquema Zod.

import { Router, Request, Response } from 'express';
import { ItemController } from '../controllers/item.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { CreateItemSchema, UpdateItemSchema } from '../schemas/item.schema.js';

const router = Router();
const controller = new ItemController();

// GET /items — lista pública del catálogo de servicios.
router.get('/', (req, res) => controller.getAll(req, res));

// POST /items — crea un servicio nuevo. Requiere token y body válido.
router.post(
  '/',
  authMiddleware,
  validate(CreateItemSchema),
  (req, res) => controller.create(req, res)
);

// PUT /items/:id — edita un servicio existente. Requiere token y body válido.
router.put(
  '/:id',
  authMiddleware,
  validate(UpdateItemSchema),
  (req: Request<{ id: string }>, res: Response) => controller.update(req, res)
);

// DELETE /items/:id — elimina un servicio. Requiere token; no lleva body.
router.delete(
  '/:id',
  authMiddleware,
  (req: Request<{ id: string }>, res: Response) => controller.delete(req, res)
);

export default router;