import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  supabase = inject(Supabase);

  detail = this.supabase.productDetail;

  ngOnInit() {
    let currentId = Number(this.route.snapshot.paramMap.get('id'));
    if (currentId) {
      console.log('Current ID:', currentId);
      this.supabase.setProductDetailsById(currentId);
      console.log(this.supabase.productDetail);
    }
  }

  async deleteDetail() {
    const deleted = await this.supabase.deleteProduct(this.detail().id);
    if (!deleted) return;
    await this.router.navigate(['/']);
  }
}
