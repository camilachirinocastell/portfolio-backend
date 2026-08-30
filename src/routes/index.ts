// src/routes/index.ts
// Punto único que agrupa todas las rutas del proyecto, para que
// app.ts monte un solo router en vez de conocer cada archivo de
// rutas por separado.

import { Router } from 'express';
import authRoutes from './auth.routes.js';
import itemRoutes from './item.routes.js';

const router = Router();

router.use('/users', authRoutes);
router.use('/items', itemRoutes);

export default router;