import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { Goods } from '../../../services/goods';

@Component({
  selector: 'app-quantity-control',
  imports: [],
  templateUrl: './quantity-control.html',
  styleUrl: './quantity-control.css',
})
export class QuantityControl {
  goods = inject(Goods);
  cartItemID = input.required<string>();
  timerDebounce: any = null;

  currentCartItem = computed(() => {
    const id = this.cartItemID();
    const list = this.goods.cartGoods();
    return list.find(el => el.id === id);
  });

  counter = linkedSignal(() => this.currentCartItem()?.quantity);

  updateQuantity() {
    clearTimeout(this.timerDebounce);
    this.timerDebounce = setTimeout(() => {
      const inc = this.counter();
      this.goods.updateQuantityByIdCart(this.cartItemID(), inc!);
    }, 300)
  }

  increase() {
    this.counter.update(v => v! + 1);
    this.updateQuantity()
  };

  decrease() {
    if (this.counter() !== 1) {
      this.counter.update(v => v! - 1);
      this.updateQuantity()
    }
  };
}