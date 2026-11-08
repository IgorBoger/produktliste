import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Supabase } from '../../services/supabase/supabase';
import type { Product } from '../../interfaces/product';
import { ProductModel } from '../../models/productmodel';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'main-product-form',
  styleUrl: './product-form.scss',
  templateUrl: './product-form.html',
})
export class ProductForm {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  supabase = inject(Supabase);

  productForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(15)],
    }),
    specs: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(15)],
    }),
    stock: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    price: new FormControl(0.0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  async onSubmit() {
    if (this.productForm.valid) {
      const values = this.productForm.getRawValue();
      const id = this.route.snapshot.paramMap.get('id');
      const now = new Date().toISOString();
      const product = new ProductModel({
        ...values,
        id: Math.max(0, ...this.supabase.productList().map((p) => p.id)) + 1,
        created_at: now,
        updated_at: now,
      });

      if (id) {
        const existingProduct = this.supabase.productList().find((p) => p.id === +id);
        if (existingProduct) {
          product.id = existingProduct.id;
          product.created_at = existingProduct.created_at;
          const saved = await this.supabase.updateProduct(product);
          if (!saved) return;
        } else {
          return;
        }
      } else {
        const saved = await this.supabase.addProduct(product);
        if (!saved) return;
      }
      await this.router.navigate(['/']);
    }
  }

  headline = 'Produkt erstellen';
  btn_text = 'Produkt hinzufügen';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const product = this.supabase.productList().find((p) => p.id === +id);
      if (product) {
        this.setEditorDetails(product);
      }
    }
  }

  setEditorDetails(product: Product) {
    this.headline = 'Produkt bearbeiten';
    this.btn_text = 'Änderungen speichern';
    this.productForm.patchValue(new ProductModel(product));
  }
}
