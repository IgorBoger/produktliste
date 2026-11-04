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
    let currentName = this.route.snapshot.paramMap.get('name');
    if (currentName) {
      console.log('Current Name:', currentName);
      this.productService.setProductDetailsByName(currentName);
      console.log(this.productService.productDetail);
    }
  }

  deleteDetail() {
    this.productService.deleteProduct(this.detail().id);
    this.router.navigate(['/']);
  }
}
