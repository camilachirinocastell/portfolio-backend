// src/schemas/item.schema.ts
// Define la forma válida del cuerpo de una petición para crear o
// actualizar un servicio del catálogo, usando Zod.

import { z } from 'zod';

export const CreateItemSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres'),
  description: z.string().min(15, 'La descripción debe tener al menos 15 caracteres'),
  category: z.enum(['AI', 'Fullstack', 'Automation']),
  priceEstimate: z.string(),
  deliveryTime: z.string(),
});

export const UpdateItemSchema = CreateItemSchema.partial();