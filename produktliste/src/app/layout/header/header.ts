import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'main-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  // btnClassList = 'btn btn--primary';
  // btnClassList = 'btn btn--secondary';
  path = '';
  btn_text = 'Neues Produkt';
  ngOnInit() {
    this.path = '';
    if (this.path == 'details') {
    this.btn_text = "zurück zur Liste";

      // this.btnClassList = 'btn btn--secondary';
    } 
  }
}
