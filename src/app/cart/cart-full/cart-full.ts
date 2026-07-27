import { Component, inject } from '@angular/core';
import { Button } from "../../button/button";
import { CurrencyPipe } from '../../pipes/currency-pipe-pipe';
import { Goods } from '../../services/goods';
import { CartItem } from "./cart-item/cart-item";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-full',
  imports: [Button, CurrencyPipe, CartItem],
  templateUrl: './cart-full.html',
  styleUrl: './cart-full.css',
})

export class CartFull {
  goodsService = inject(Goods);
  router = inject(Router);

  totalPrice() {
    return this.goodsService.cartGoods().reduce((prevS, el) => {
      return prevS + el.quantity * el.product.price
    }, 0)
  }

  goToMainPage() {
    this.router.navigate(['']);
  }
}
