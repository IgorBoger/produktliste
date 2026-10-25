import { RouterLink } from '@angular/router';
import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import { Products } from '../../services/products';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);

@Component({
  imports: [RouterLink, CurrencyPipe, DatePipe],
  selector: 'main-product-list',
  styleUrl: './product-list.scss',
  templateUrl: './product-list.html',
})
export class ProductList {
  productService = inject(Products);
  list = this.productService.productList;
}
