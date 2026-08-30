// src/app.ts
// Punto de entrada de la aplicación. Configura el servidor Express,
// sus middlewares globales y monta las rutas del proyecto.

import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import routes from './routes/index.js';

const app = express();

// Permite que el cuerpo de las peticiones en formato JSON llegue
// disponible en req.body.
app.use(express.json());

// Habilita que un frontend en otro dominio (por ejemplo, tu portfolio
// desplegado en Netlify) pueda consultar esta API sin ser bloqueado
// por el navegador.
app.use(cors());

// Sirve el frontend estático opcional, si existe, desde /public.
app.use(express.static('public'));

// Monta todas las rutas del proyecto (/users y /items).
app.use(routes);

app.listen(ENV.PORT, () => {
  console.log(`Server running on port ${ENV.PORT}`);
});