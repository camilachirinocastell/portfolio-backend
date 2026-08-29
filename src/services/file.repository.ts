// src/services/file.repository.ts
// Repositorio genérico para leer y escribir listas de datos en archivos JSON,
// simulando una base de datos simple. Sirve tanto para usuarios como para
// servicios del portfolio: el tipo real se define al instanciar la clase.
import fs from "fs/promises";
import path from "path";

export interface Identifiable {
  id: string;
}

export class FileRepository<T extends Identifiable> {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.join(import.meta.dirname, "../data", fileName);
  }

  // Lee todos los registros. Si el archivo no existe todavía, devuelve una lista vacía
  // en vez de romper la aplicación.
  async getAll(): Promise<T[]> {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data) as T[];
    } catch {
      return [];
    }
  }

  // Sobrescribe el archivo completo con la lista actualizada.
  async saveAll(items: T[]): Promise<void> {
    const dir = path.dirname(this.filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(this.filePath, JSON.stringify(items, null, 2), "utf-8");
  }

  async getById(id: string): Promise<T | null> {
    const items = await this.getAll();
    return items.find((item) => item.id === id) || null;
  }

  async create(item: T): Promise<T> {
    const items = await this.getAll();
    items.push(item);
    await this.saveAll(items);
    return item;
  }

  async update(id: string, updatedFields: Partial<T>): Promise<T | null> {
    const items = await this.getAll();
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;

    items[index] = { ...items[index], ...updatedFields };
    await this.saveAll(items);
    return items[index];
  }

  async delete(id: string): Promise<boolean> {
    const items = await this.getAll();
    const filtered = items.filter((item) => item.id !== id);
    if (items.length === filtered.length) return false;

    await this.saveAll(filtered);
    return true;
  }
}