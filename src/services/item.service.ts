// src/services/item.service.ts
// Contiene la lógica de negocio del catálogo de servicios del portfolio.
// No sabe nada de HTTP: solo resuelve preguntas sobre los datos
// (por ejemplo, "dame los servicios de esta categoría").

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
}