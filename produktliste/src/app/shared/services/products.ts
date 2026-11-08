import { Injectable, signal, inject } from '@angular/core';
import { Product } from '../interfaces/product';
import { Supabase } from './supabase/supabase';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private readonly supabase = inject(Supabase);
  private readonly storageKey = 'products';
  // productList = signal<Product[]>([]);
  productList = this.supabase.products;

  productDetail = signal<Product>({
    id: 0,
    created_at: 'n/a',
    name: 'n/a',
    description: 'n/a',
    specs: 'n/a',
    stock: 0,
    price: 0,
    updated_at: 'n/a',
  });

  addProduct(product: Product) {
    this.productList.update((list) => [...list, product]);
    this.saveProducts();
  }

  updateProduct(product: Product) {
    this.productList.update((list) => list.map((p) => (p.id === product.id ? product : p)));
    this.saveProducts();
  }

  deleteProduct(id: number) {
    this.productList.update((list) => list.filter((product) => product.id !== id));
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
    const fields = ['created_at', 'name', 'description', 'specs', 'updated_at'];
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
    this.supabase.getAllProducts();
  }
}
