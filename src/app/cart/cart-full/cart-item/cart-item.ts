import { Component, effect, inject, input, signal } from '@angular/core';
import { CartGoodsType, Goods } from '../../../services/goods';
import { CurrencyPipe } from '../../../pipes/currency-pipe-pipe';

@Component({
  selector: 'app-cart-item',
  imports: [CurrencyPipe],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})

export class CartItem {
  goodsService = inject(Goods);
  data = input<CartGoodsType>();
  quantity = signal<number | undefined>(undefined);

  onClick() {
    const s = this.goodsService.cartGoods().reduce((prevS, el) => {
      return prevS + el.quantity * el.product.price
    }, 0)
    console.log(s)
  }

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
