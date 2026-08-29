// src/models/user.model.ts
// Representa a la administradora del portfolio (usuario con acceso al backstage).
// La contraseña nunca se guarda en texto plano, siempre como hash (bcrypt).
export interface User {
  id: string;
  email: string;
  password: string;
}