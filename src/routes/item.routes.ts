// src/routes/item.routes.ts
// Define las rutas HTTP del catálogo de servicios y las conecta con
// su controlador correspondiente.

import { Router } from 'express';
import { ItemController } from '../controllers/item.controller.js';

const router = Router();
const controller = new ItemController();

// GET /items — lista pública del catálogo de servicios.
router.get('/', (req, res) => controller.getAll(req, res));

export default router;