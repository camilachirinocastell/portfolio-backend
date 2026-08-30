// src/services/auth.service.ts
// Contiene la lógica de negocio de autenticación: registro de la
// administradora y verificación de credenciales al iniciar sesión.
// No sabe nada de HTTP: recibe datos simples y devuelve resultados o
// lanza errores para que el controlador los traduzca a respuestas.

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { FileRepository } from './file.repository.js';
import { User } from '../models/user.model.js';
import { ENV } from '../config/env.js';

export class AuthService {
  private repository = new FileRepository<User>('users.json');

  // Registra una nueva administradora. Rechaza el registro si el
  // email ya existe, y guarda la contraseña como hash, nunca en
  // texto plano.
  async register(email: string, password: string): Promise<Omit<User, 'password'>> {
    const users = await this.repository.getAll();
    const alreadyExists = users.some((user) => user.email === email);

    if (alreadyExists) {
      throw new Error('EMAIL_ALREADY_REGISTERED');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
    };

    await this.repository.create(newUser);

    // Se devuelve el usuario sin la contraseña, ni siquiera hasheada.
    const { password: _password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  // Verifica email y contraseña. Si son correctos, firma y devuelve
  // un token JWT válido por 2 horas.
  async login(email: string, password: string): Promise<string> {
    const users = await this.repository.getAll();
    const user = users.find((u) => u.email === email);

    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, ENV.JWT_SECRET, {
      expiresIn: '2h',
    });

    return token;
  }
}