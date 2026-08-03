import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '../../../pipes/currency-pipe-pipe';

@Component({
  selector: 'app-cart-footer',
  imports: [CurrencyPipe],
  templateUrl: './cart-footer.html',
  styleUrl: './cart-footer.css',
})
export class CartFooter {
  total = input.required<number>();
  checkout = output<void>();
  continueShopping = output<void>();
  clearCart = output<void>();
}
