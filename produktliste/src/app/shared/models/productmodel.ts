import { Product } from '../interfaces/product';

export class ProductModel implements Product {
  id: number;
  created_at: string;
  name: string;
  description: string;
  specs: string;
  stock: number;
  price: number;
  updated_at: string;

  constructor(data: Partial<Product> = {}) {
    this.id = data.id ?? 0;
    this.created_at = data.created_at ?? '';
    this.name = data.name ?? '';
    this.description = data.description ?? '';
    this.specs = data.specs ?? '';
    this.stock = data.stock ?? 0;
    this.price = data.price ?? 0;
    this.updated_at = data.updated_at ?? '';
  }

  getClientAddJson() {
    return {
      name: this.name,
      description: this.description,
      specs: this.specs,
      stock: this.stock,
      price: this.price,
    };
  }
}
