import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { ProductList } from './shared/components/product-list/product-list';
import { CreateProduct } from './shared/components/create-product/create-product';
import { ProductDetails } from './shared/components/product-details/product-details';

@Component({
  imports: [RouterOutlet, Header, ProductList, CreateProduct, ProductDetails],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
