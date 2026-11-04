import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../services/products';
import type { Product } from '../../interfaces/product';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'main-product-form',
  styleUrl: './product-form.scss',
  templateUrl: './product-form.html',
})
export class ProductForm {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  productService = inject(Products);

  productForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(15)],
    }),
    specs: new FormControl('', {
      validators: [Validators.required, Validators.minLength(15)],
    }),
    stock: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
    price: new FormControl(0.0, { validators: [Validators.required, Validators.min(0)] }),
  });

  onSubmit() {
    if (this.productForm.valid) {
      const values = this.productForm.getRawValue();
      const id = this.route.snapshot.paramMap.get('id');

      const product: Product = {
        id: Math.max(0, ...this.productService.productList().map((product) => product.id)) + 1,
        name: values.name ?? '',
        description: values.description ?? '',
        specs: values.specs ?? '',
        stock: values.stock ?? 0,
        price: values.price ?? 0,
        updatedAt: new Date().toISOString(),
      };

      if (id) {
        const existingProduct = this.productService.productList().find((p) => p.id === +id);
        if (existingProduct) {
          product.id = existingProduct.id;
          this.productService.updateProduct(product);
        } else {
          return;
        }
      } else {
        this.productService.addProduct(product);
      }
      this.router.navigate(['/']);
    }
  }

  headline = 'Produkt erstellen';
  btn_text = 'Produkt hinzufügen';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const product = this.productService.productList().find((p) => p.id === +id);
      if (product) {
        this.setEditorDetails(product);
      }
    }
  }

  setEditorDetails(product: Product) {
    this.headline = 'Produkt bearbeiten';
    this.btn_text = 'Änderungen speichern';
    this.productForm.patchValue(product);
  }
}
