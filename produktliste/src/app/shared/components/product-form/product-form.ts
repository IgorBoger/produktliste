import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'main-product-form',
  styleUrl: './product-form.scss',
  templateUrl: './product-form.html',
})
export class ProductForm {
  productForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(15)],
    }),
    stock: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
    price: new FormControl(0.0, { validators: [Validators.required, Validators.min(0)] }),
  });

  onSubmit() {
    // TODO: Use output() with form value
    if (this.productForm.invalid) {
      console.log(this.productForm.value);
      this.productForm.markAllAsTouched();
      return;
    }
  }
}
