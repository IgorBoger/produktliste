import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'main-product-details',
  styleUrl: './product-details.scss',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  detail = {
    name: 'Gaming Maus',
    description:
      'Eine ergonomische Gaming-Maus mit hoher Präzision und einstellbarer DPI. Ideal für FPS- und MOBA-Spiele, bietet sie eine langlebige Bauweise und komfortable Seitentasten für schnelles Reagieren.',
    specs: 'dpi: 6400, cable length: 1.8m, color: Schwarz',
    stock: 120,
    price: 29.99,
  };

  deleteDetail() {
    console.log('Detail gelöscht');
    this.detail.name = '';
    this.detail.description = '';
    this.detail.specs = '';
    this.detail.stock = 0;
    this.detail.price = 0;
  }
}
