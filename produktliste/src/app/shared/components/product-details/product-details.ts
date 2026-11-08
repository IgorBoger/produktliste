import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Products } from '../../services/products';
import { Supabase } from '../../services/supabase/supabase';

@Component({
  imports: [RouterLink],
  selector: 'main-product-details',
  styleUrl: './product-details.scss',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  productService = inject(Products);
  supabase = inject(Supabase);

  detail = this.productService.productDetail;

  ngOnInit() {
    let currentId = Number(this.route.snapshot.paramMap.get('id'));
    if (currentId) {
      console.log('Current ID:', currentId);
      this.productService.setProductDetailsById(currentId);
      console.log(this.productService.productDetail);
    }
  }

  async deleteDetail() {
    const deleted = await this.supabase.deleteProduct(this.detail().id);
    if (!deleted) return;
    await this.router.navigate(['/']);
  }
}
