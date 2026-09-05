// src/controllers/item.controller.ts
// Recibe las peticiones HTTP relacionadas con el catálogo de servicios,
// le pide los datos a ItemService y arma la respuesta para el cliente.
// No contiene lógica de negocio: solo traduce entre HTTP y el servicio.

import { Request, Response } from 'express';
import { ItemService } from '../services/item.service.js';

const itemService = new ItemService();

export class ItemController {
  // GET /items?category=ai
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

  // POST /items
  // El body ya llegó validado por el middleware de Zod (Fase 5).
  async create(req: Request, res: Response): Promise<void> {
    const newItem = await itemService.createService(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Servicio creado exitosamente',
      data: newItem,
    });
  }

  // PUT /items/:id
  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const updatedItem = await itemService.updateService(id, req.body);

    if (!updatedItem) {
      res.status(404).json({
        status: 'error',
        message: 'No se encontró ningún servicio con ese id',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Servicio actualizado exitosamente',
      data: updatedItem,
    });
  }

  // DELETE /items/:id
  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const wasDeleted = await itemService.deleteService(id);

    if (!wasDeleted) {
      res.status(404).json({
        status: 'error',
        message: 'No se encontró ningún servicio con ese id',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Servicio eliminado exitosamente',
    });
  }
}