// src/services/item.service.ts
// Contiene la lógica de negocio del catálogo de servicios del portfolio.
// No sabe nada de HTTP: solo resuelve preguntas sobre los datos
// (por ejemplo, "dame los servicios de esta categoría" o "creá uno nuevo").

import crypto from 'crypto';
import { FileRepository } from './file.repository.js';
import { ServiceItem } from '../models/item.model.js';

export class ItemService {
  private repository = new FileRepository<ServiceItem>('items.json');

  // Devuelve todos los servicios. Si se pasa una categoría, filtra por
  // ella ignorando mayúsculas/minúsculas ("ai" y "AI" devuelven lo mismo).
  async getAllServices(categoryFilter?: string): Promise<ServiceItem[]> {
    const items = await this.repository.getAll();

    if (categoryFilter) {
      return items.filter(
        (item) => item.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    return items;
  }

  // Crea un servicio nuevo. El id lo genera el servidor (nunca lo manda
  // el cliente), y el estado arranca siempre en "active".
  async createService(data: Omit<ServiceItem, 'id' | 'status'>): Promise<ServiceItem> {
    const newItem: ServiceItem = {
      id: crypto.randomUUID(),
      ...data,
      status: 'active',
    };

    return this.repository.create(newItem);
  }

  // Actualiza parcial o totalmente un servicio existente. Devuelve null
  // si no existe ningún servicio con ese id.
  async updateService(id: string, data: Partial<ServiceItem>): Promise<ServiceItem | null> {
    return this.repository.update(id, data);
  }

  // Elimina un servicio. Devuelve false si no existía.
  async deleteService(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}