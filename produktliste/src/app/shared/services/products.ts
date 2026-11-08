import { Injectable, signal, inject } from '@angular/core';
import { Product } from '../interfaces/product';
import { Supabase } from './supabase/supabase';

@Injectable({
  providedIn: 'root',
})
export class Products {
  private readonly supabase = inject(Supabase);
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

  updateProduct(product: Product) {
    this.productList.update((list) => list.map((p) => (p.id === product.id ? product : p)));
  }

  deleteProduct(id: number) {
    this.productList.update((list) => list.filter((product) => product.id !== id));
  }

  setProductDetailsById(id: number) {
    const tmpProduct = this.productList().find((product) => product.id === id);
    if (tmpProduct) this.productDetail.set(tmpProduct);
  }

  constructor() {
    this.supabase.getAllProducts();
  }
}
