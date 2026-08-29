// src/controllers/item.controller.ts
// Recibe las peticiones HTTP relacionadas con el catálogo de servicios,
// le pide los datos a ItemService y arma la respuesta para el cliente.
// No contiene lógica de negocio: solo traduce entre HTTP y el servicio.

import { Request, Response } from 'express';
import { ItemService } from '../services/item.service.js';

const itemService = new ItemService();

export class ItemController {
  // GET /items?category=ai
  // Devuelve el catálogo completo, o filtrado por categoría si se
  // envía el parámetro de consulta "category".
  async getAll(req: Request, res: Response): Promise<void> {
    const { category } = req.query;

    const items = await itemService.getAllServices(
      typeof category === 'string' ? category : undefined
    );

    res.status(200).json({
      status: 'success',
      results: items.length,
      data: items,
    });
  }
}