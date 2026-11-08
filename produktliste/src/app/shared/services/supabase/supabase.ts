import { Injectable, signal } from '@angular/core';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import type { Product } from '../../interfaces/product';

@Injectable()
export class Supabase {
  supabaseUrl = 'https://qkezngeccrbdybfwksmc.supabase.co';
  supabaseKey = 'sb_publishable_-1eCokRBQfBGmpHwaeKSPA_B75ipkoZ';
  supabase = createClient(this.supabaseUrl, this.supabaseKey);

  products = signal<Product[]>([]);
  channels: RealtimeChannel | undefined;

  async getAllProducts() {
    // const data = await this.supabase.from('products').select('*');
    // console.log('Fetched products:', data.data);
    // if (data.data) {
    //   this.products.set(data.data);
    // }

    const { data: products, error } = await this.supabase.from('products').select('*');
    console.log('Fetched products:', products);
    if (error) {
      console.error('Failed to load products:', error);
      return;
    }
    // if (products) {
    //   this.products.set(products);
    // }

    // if (!products) return;
    // this.products.set(products);

    this.products.set((products ?? []) as Product[]);
  }

  // async getProducts(search: string = '') {
  //   let query = this.supabase
  //     .from('products')
  //     .select('*')
  //     // .eq('name', 'violin') // Example: get products with exactly this name
  //     // .order('id', { ascending: true }) // Stable order for pagination
  //     .range(3, 4); // Example: get the first 3 matching products (0-based index)
  //   // .eq('name', 'violin') // Filters also work here; they apply before pagination
  //   // .lt('stock', 10)    // Example: get products with stock less than 10
  //   // .lte('stock', 10) // Example: get products with stock less than or equal to 10
  //   // .like('name', '%moniTor%'); // Case-sensitive match (Monitor with exact case)
  //   // .ilike('name', '%moniTor%'); // Case-insensitive match (Monitor with any case: moniTor, MONITOR, monitor, etc.)

  //   if (search !== '') {
  //     query = query.ilike('name', `%${search}%`);
  //   }
  //   const { data: pruductlist, error } = await query;

  //   if (error) {
  //     console.error('Failed to load products:', error);
  //     return;
  //   }

  //   if (!pruductlist) return;
  //   this.products.set(pruductlist);
  // }

  // ngOnDestroy() {
  //   if (this.channels) {
  //     this.supabase.removeChannel(this.channels);
  //   }
  // }

  // listensForChanges() {
  //   if (this.channels) return;
  //   this.channels = this.supabase
  //     .channel('custom-all-channel')
  //     .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
  //       console.log('Change received!', payload);
  //       this.getProducts();
  //     })
  //     .subscribe();
  // }

  // async setProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
  //   const { data, error } = await this.supabase.from('products').insert([product]).select();
  //   this.getProducts();
  //   console.log('Inserted product data:', data);
  //   if (error) {
  //     console.error('Failed to set product:', error);
  //     return;
  //   }
  //   console.log('Inserted product error:', error);
  // }

  // async updateProduct(id: number) {
  //   const { data, error } = await this.supabase
  //     .from('products')
  //     .update({ description: 'Updated Description, FULL HD' })
  //     .eq('id', id)
  //     .select();
  //   if (error) {
  //     console.error('Failed to update product:', error);
  //     return;
  //   }
  //   console.log('Updated product data:', data);
  //   this.getProducts();
  // }

  // async deleteProduct(id: number) {
  //   const { error } = await this.supabase.from('products').delete().eq('id', id);
  //   console.log('Deleted product with ID:', id);
  //   if (error) {
  //     console.error('Failed to delete product:', error);
  //     return;
  //   }
  //   this.getProducts();
  // }
}
