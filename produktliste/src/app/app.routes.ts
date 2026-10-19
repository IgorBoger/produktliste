import { Routes } from '@angular/router';
import { ProductList } from './shared/components/product-list/product-list';
import { ProductDetails } from './shared/components/product-details/product-details';

export const routes: Routes = [
  {
    path: '',
    component: ProductList,
  },
  {
    path: 'details/:name',
    component: ProductDetails,
  },
];
