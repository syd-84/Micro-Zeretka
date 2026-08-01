import { Component, computed, effect, inject, input, signal, viewChild } from '@angular/core';
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
  timeToUpdate: any = null;

  totalPrice = computed(() => {
    const foundedCartProduct = this.goodsService.cartGoods().find(el => el.id === this.data()?.id);
    const productPrice = foundedCartProduct?.product.price;
    const quantity = foundedCartProduct?.quantity
    return productPrice! * quantity!;
  });

  updateQuantity(quantity: number) {
    clearTimeout(this.timeToUpdate);
    this.timeToUpdate = setTimeout(() => {
      const cartId = this.data()?.id;
      this.goodsService.updateQuantityByIdCart(cartId!, quantity);
    }, 300)
  }

  increment() {
    this.quantity.update(v => v! + 1);
    this.updateQuantity(this.quantity()!)
  }

  decrement() {
    if (this.quantity()! > 1) {
      this.quantity.update(v => v! - 1);
      this.updateQuantity(this.quantity()!)
    }
  }

  constructor() {
    effect(() => {
      this.data();
      this.quantity.set(this.data()?.quantity)
    })
  }
}
