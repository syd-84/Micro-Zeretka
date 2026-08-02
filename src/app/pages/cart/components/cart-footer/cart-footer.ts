import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-cart-footer',
  imports: [],
  templateUrl: './cart-footer.html',
  styleUrl: './cart-footer.css',
})
export class CartFooter {
  total = input.required<number>();
  checkout = output<void>();
  continueShopping = output<void>();
  clearCart = output<void>();
}
