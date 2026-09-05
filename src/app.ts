// src/app.ts
// Punto de entrada de la aplicación. Configura el servidor Express,
// sus middlewares globales y monta las rutas del proyecto.

import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import routes from './routes/index.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use(routes);

// Va al final: Express solo activa un middleware de errores cuando
// ningún handler anterior manejó la petición con éxito.
app.use(errorMiddleware);

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});