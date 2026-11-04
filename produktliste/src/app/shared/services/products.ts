import { Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private readonly storageKey = 'products';
  productList = signal<Product[]>([]);

  productDetail = signal<Product>({
    id: 0,
    name: 'n/a',
    description: 'n/a',
    specs: 'n/a',
    stock: 0,
    price: 0,
    updatedAt: 'n/a',
  });

  addProduct(product: Product) {
    this.productList.update((list) => [...list, product]);
    this.saveProducts();
  }

  updateProduct(product: Product) {
    this.productList.update((list) => list.map((p) => (p.id === product.id ? product : p)));
    this.saveProducts();
  }

  private saveProducts() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.productList()));
    } catch (error) {
      console.warn('Products could not be saved to localStorage.', error);
    }
  }

  private loadProducts() {
    try {
      const storedProducts = localStorage.getItem(this.storageKey);
      if (storedProducts === null) return;
      const products: unknown = JSON.parse(storedProducts);
      if (this.isProductList(products)) {
        this.productList.set(products);
      }
    } catch (error) {
      console.warn('Products could not be loaded from localStorage.', error);
    }
  }

  private isProductList(value: unknown): value is Product[] {
    return Array.isArray(value) && value.every((item) => this.isProduct(item));
  }

  private isProduct(value: unknown): value is Product {
    if (value === null || typeof value !== 'object') {
      return false;
    }
    const product = value as Record<string, unknown>;
    return (
      this.hasValidProductId(product) &&
      this.hasValidProductTexts(product) &&
      this.hasValidProductNumbers(product)
    );
  }

  private hasValidProductId(product: Record<string, unknown>): boolean {
    const id = product['id'];
    return typeof id === 'number' && Number.isInteger(id) && id > 0;
  }

  private hasValidProductTexts(product: Record<string, unknown>): boolean {
    const fields = ['name', 'description', 'specs', 'updatedAt'];
    return fields.every((field) => typeof product[field] === 'string');
  }

  private hasValidProductNumbers(product: Record<string, unknown>): boolean {
    const fields = ['stock', 'price'];
    return fields.every((field) => {
      const value = product[field];
      return typeof value === 'number' && Number.isFinite(value) && value >= 0;
    });
  }

  setProductDetailsByName(name: string) {
    const tmpProduct = this.productList().find((product) => product.name === name);
    if (tmpProduct) this.productDetail.set(tmpProduct);
  }

  constructor() {
    this.productList.set([
      {
        id: 1,
        name: 'Gaming Maus',
        description:
          'Eine ergonomische Gaming-Maus mit hoher Präzision und einstellbarer DPI. Ideal für FPS- und MOBA-Spiele, bietet sie eine langlebige Bauweise und komfortable Seitentasten für schnelles Reagieren.',
        specs: 'dpi: 6400, cable length: 1.8m, color: Schwarz',
        stock: 120,
        price: 29.99,
        updatedAt: '2026-10-20',
      },
      {
        id: 2,
        name: 'Mechanische Tastatur',
        description:
          'Hochwertige mechanische Tastatur mit RGB-Hintergrundbeleuchtung. Die schnellen Switches sorgen für präzise Eingaben und langen Schreibkomfort. Ideal für Gamer und Vielschreiber.',
        specs: 'switches: Red, connection: USB, color: Schwarz',
        stock: 85,
        price: 79.9,
        updatedAt: '2026-10-18',
      },
      {
        id: 3,
        name: 'HDMI Kabel',
        description:
          'Ein zuverlässiges HDMI 2.1 Kabel, das gestochen scharfe Bilder in 4K und 8K Qualität liefert. Geeignet für Fernseher, Monitore, Konsolen und Projektoren. Unterstützt HDR und hohe Bildwiederholraten.',
        specs: 'length: 2m, version: 2.1, color: Schwarz',
        stock: 250,
        price: 12.99,
        updatedAt: '2026-10-15',
      },
      {
        id: 4,
        name: 'Externe SSD',
        description:
          'Leistungsstarke und kompakte externe SSD für schnelle Datenübertragung. Perfekt für große Dateien, Gaming-Bibliotheken oder als Backup-Lösung. Stoßfestes Gehäuse für den mobilen Einsatz.',
        specs: 'capacity: 1TB, interface: USB 3.2, color: Silber',
        stock: 60,
        price: 109.99,
        updatedAt: '2026-10-19',
      },
      {
        id: 5,
        name: 'Bluetooth Kopfhörer',
        description:
          'Kabellose Over-Ear Kopfhörer mit klaren Höhen und kräftigem Bass. Dank 20 Stunden Akkulaufzeit und komfortabler Ohrpolster ideal für lange Musik- oder Gaming-Sessions.',
        specs: 'battery life: 20h, color: Schwarz, connection: Bluetooth 5.0',
        stock: 150,
        price: 59.95,
        updatedAt: '2026-10-17',
      },
    ]);
    this.loadProducts();
  }
}
