import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../services/products';

@Component({
  imports: [],
  selector: 'main-product-details',
  styleUrl: './product-details.scss',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  private route = inject(ActivatedRoute);
  productService = inject(Products);

  ngOnInit() {
    let currentName = this.route.snapshot.paramMap.get('name');
    if (currentName) {
      console.log('Current Name:', currentName);
      this.productService.setProductDetailsByName(currentName);
      console.log(this.productService.productDetail);
      this.detail = this.productService.productDetail;
    }
  }

  detail = {
    id: 0,
    name: 'n/a',
    description: 'n/a',
    specs: 'n/a',
    stock: 0,
    price: 0,
    updatedAt: 'n/a',
  };

  deleteDetail() {
    console.log('Detail gelöscht');
    this.detail.id = 0;
    this.detail.name = '';
    this.detail.description = '';
    this.detail.specs = '';
    this.detail.stock = 0;
    this.detail.price = 0;
    this.detail.updatedAt = 'n/a';
  }
}
