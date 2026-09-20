// src/config/env.ts
// Centraliza la lectura de las variables de entorno del proyecto.
// En vez de leer process.env directamente en cada archivo, todo el
// proyecto consulta este objeto único — así, si cambia el nombre de
// una variable, se actualiza en un solo lugar.

import dotenv from 'dotenv';

dotenv.config();

// Si falta una variable obligatoria, el servidor no debe arrancar
// silenciosamente con un valor inseguro por defecto.
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Falta la variable de entorno obligatoria: ${key}`);
  }
  return value;
}

export const ENV = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: requireEnv('JWT_SECRET'),
  NODE_ENV: process.env.NODE_ENV || 'development',
};