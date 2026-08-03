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

  increaseQuantity(index: number): void {
    const cart = [...this.goods.cartGoods()];

    cart[index].quantity++;

    this.goods.cartGoods.set(cart);

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  decreaseQuantity(index: number): void {
    const cart = [...this.goods.cartGoods()];

    if (cart[index].quantity !== 1) {
      cart[index].quantity--;
    }

    this.goods.cartGoods.set(cart);

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeItem(index: number): void {
    const productId = this.goods.cartGoods()[index].product.id;
    this.goods.deleteCartGoodsByProductId(productId);
  }

  checkout(): void {
    this.goods.clearCart();
    console.log('order done');
  }

  clearCart(): void {
    this.goods.clearCart();
  }
}
