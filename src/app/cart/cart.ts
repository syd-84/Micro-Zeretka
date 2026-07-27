import { Component } from '@angular/core';
import { CartFull } from "./cart-full/cart-full";

@Component({
  selector: 'app-cart',
  imports: [CartFull],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart { }
