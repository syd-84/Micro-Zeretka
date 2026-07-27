import { Component, inject } from '@angular/core';
import { CartFull } from "./cart-full/cart-full";
import { Goods } from '../services/goods';
import { CartEmpty } from "./cart-empty/cart-empty";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CartFull, CartEmpty],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  goodsService = inject(Goods);
  router = inject(Router);

  goToMainPage() {
    this.router.navigate(['']);
  }
}
