import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'main-product-form',
  styleUrl: './product-form.scss',
  templateUrl: './product-form.html',
})
export class ProductForm {
  productForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('n/a'),
    description: new FormControl('n/a'),
    // specs: new FormControl('n/a'),
    stock: new FormControl(0),
    price: new FormControl(0.0),
    // updatedAt: new FormControl('n/a')
  });

  onSubmit() {
    // TODO: Use output() with form value
    console.log(this.productForm.value);
  }
}
