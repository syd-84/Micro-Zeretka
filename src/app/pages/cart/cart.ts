import { Component, inject } from '@angular/core';

import { Goods } from '../../services/goods';
import { CartModal } from '../../services/cart-modal';

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
      return sum + item.product.price * item.number;
    }, 0);
  }

  increaseQuantity(index: number): void {
    const cart = [...this.goods.cartGoods()];

    cart[index].number++;

    this.goods.cartGoods.set(cart);

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  decreaseQuantity(index: number): void {
    const cart = [...this.goods.cartGoods()];

    if (cart[index].number === 1) {
      //cart.(index, 1);
    } else {
      cart[index].number--;
    }

    this.goods.cartGoods.set(cart);

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeItem(index: number): void {
    const cart = [...this.goods.cartGoods()];

    this.goods.removeCardItem(index);
  }

  checkout(): void {
    this.goods.cartGoods.set([]);

    localStorage.setItem('cart', JSON.stringify([]));

    this.cartModal.close();
  }

  clearCart(): void {
    this.goods.clearCart();
  }
}
