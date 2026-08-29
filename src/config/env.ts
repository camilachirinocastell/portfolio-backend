// src/config/env.ts
// Centraliza la lectura de las variables de entorno del proyecto.
// En vez de leer process.env directamente en cada archivo, todo el
// proyecto consulta este objeto único — así, si cambia el nombre de
// una variable, se actualiza en un solo lugar.

import dotenv from 'dotenv';

// Carga las variables definidas en el archivo .env hacia process.env.
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key-123',
  NODE_ENV: process.env.NODE_ENV || 'development',
};