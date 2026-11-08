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
  channels: RealtimeChannel | undefined;

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
    console.log(product.getClientAddJson());
    const product_data = product.getClientAddJson();
    const { error } = await this.supabase.from('products').insert(product_data);
    if (error) {
      console.error('Failed to add product:', error);
      return false;
    }
    await this.getAllProducts();
    return true;
  }

}
