import { Component, effect, inject, input, signal, viewChild } from '@angular/core';
import { CartGoodsType, Goods } from '../../../services/goods';
import { CurrencyPipe } from '../../../pipes/currency-pipe-pipe';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})

export class CartItem {
  goodsService = inject(Goods);
  data = input<CartGoodsType>();
  quantity = signal<number | undefined>(undefined);

  changeQuantity(value: number | undefined) {
    return this.goodsService.cartGoods.update(arr =>
      arr.map(el => el.product.id === this.data()?.product.id ? { ...el, quantity: value! } : el))
  }

  increment() {
    this.quantity.update(v => v! + 1);
    this.changeQuantity(this.quantity());
  }

  decrement() {
    if (this.quantity()! > 1) {
      this.quantity.update(v => v! - 1);
      this.changeQuantity(this.quantity());
    }
  }

  constructor() {
    effect(() => {
      this.quantity.set(this.data()?.quantity)
    })
  }
}
