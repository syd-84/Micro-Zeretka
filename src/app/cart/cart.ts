import { Component, inject } from '@angular/core';

import { Goods } from '../services/goods';
import { CartModal } from '../services/cart-modal';

import { CartItem } from './components/cart-item/cart-item';
import { CartFooter } from './components/cart-footer/cart-footer';

@Component({
  selector: 'app-cart',
  imports: [CartItem, CartFooter],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  goods = inject(Goods);
  cartModal = inject(CartModal);

  get total(): number {
    return this.goods.cartGoods().reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
  }

  checkout(): void {
    if (this.goods.cartGoods().length) {
      this.goods.clearCart();
      console.log('order done');
    }
  }

  clearCart(): void {
    if (this.goods.cartGoods().length) {
      this.goods.clearCart();
    }
  }
}
