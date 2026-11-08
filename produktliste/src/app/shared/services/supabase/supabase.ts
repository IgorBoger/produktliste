import { Injectable, signal } from '@angular/core';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import type { Product } from '../../interfaces/product';
import { ProductModel } from '../../models/productmodel';

@Injectable()
export class Supabase {
  supabaseUrl = 'https://qkezngeccrbdybfwksmc.supabase.co';
  supabaseKey = 'sb_publishable_-1eCokRBQfBGmpHwaeKSPA_B75ipkoZ';
  supabase = createClient(this.supabaseUrl, this.supabaseKey);

  products = signal<Product[]>([]);

  productList = this.products;
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
  productListInsertChannel: RealtimeChannel | undefined;

  constructor() {
    this.getAllProducts();
    this.listensForChanges();
  }

  setProductDetailsById(id: number) {
    const tmpProduct = this.productList().find((product) => product.id === id);
    if (tmpProduct) this.productDetail.set(tmpProduct);
  }

  async getAllProducts() {
    const { data: products, error } = await this.supabase.from('products').select('*');
    console.log('Fetched products:', products);
    if (error) {
      console.error('Failed to load products:', error);
      return;
    }
    this.products.set((products ?? []) as Product[]);
  }

  async addProduct(product: ProductModel) {
    console.log('Adding product:', product.getClientAddJson());
    const product_data = product.getClientAddJson();
    const { error } = await this.supabase.from('products').insert(product_data);
    if (error) {
      console.error('Failed to add product:', error);
      return false;
    }
    await this.getAllProducts();
    return true;
  }

  async updateProduct(product: Product): Promise<boolean> {
    const { id, created_at, ...changes } = product;

    const { data, error } = await this.supabase
      .from('products')
      .update({ ...changes, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('id');

    if (error || !data?.length) {
      console.error('Failed to update product:', error ?? 'Product not found');
      return false;
    }

    await this.getAllProducts();
    return true;
  }

  listensForChanges() {
    if (this.productListInsertChannel) return;
    this.productListInsertChannel = this.supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        if (payload.eventType === 'DELETE') {
          console.log('Product deleted:', payload.old['id']);
        }

        void this.getAllProducts();
      })
      .subscribe();
  }

  ngOnDestroy() {
    if (this.productListInsertChannel) {
      this.supabase.removeChannel(this.productListInsertChannel);
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    console.log('Deleting product with ID:', id);
    const { data, error } = await this.supabase.from('products').delete().eq('id', id).select('id');
    if (error || !data?.length) {
      console.error('Failed to delete product:', error ?? 'Product not found');
      return false;
    }
    await this.getAllProducts();
    return true;
  }
}
