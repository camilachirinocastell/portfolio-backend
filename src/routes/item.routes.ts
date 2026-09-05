// src/routes/item.routes.ts
// Define las rutas HTTP del catálogo de servicios del portfolio.
import { Router } from 'express';
import { ItemController } from '../controllers/item.controller.js';

const router = Router();
const controller = new ItemController();

router.get('/', (req, res) => controller.getAll(req, res));

export default router;