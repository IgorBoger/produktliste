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
}
