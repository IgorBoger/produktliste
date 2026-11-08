import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Products } from '../../services/products';

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

  detail = this.productService.productDetail;

  ngOnInit() {
    let currentId = Number(this.route.snapshot.paramMap.get('id'));
    if (currentId) {
      console.log('Current ID:', currentId);
      this.productService.setProductDetailsById(currentId);
      console.log(this.productService.productDetail);
    }
  }

  deleteDetail() {
    this.productService.deleteProduct(this.detail().id);
    this.router.navigate(['/']);
  }
}
