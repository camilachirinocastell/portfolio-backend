// src/models/item.model.ts
// Representa un servicio profesional publicado en el catálogo del portfolio.
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: "AI" | "Fullstack" | "Automation";
  priceEstimate: string;
  deliveryTime: string;
  // Determina si el servicio se muestra en el catálogo público o está dado de baja.
  status: "active" | "inactive";
}