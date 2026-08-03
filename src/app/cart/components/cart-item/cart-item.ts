import { Component, inject, input, output } from '@angular/core';
import { AdditionalServices } from '../additional-services/additional-services';
import { QuantityControl } from '../quantity-control/quantity-control';
import { CartGoodsType, GoodsType } from '../../../services/goods';
import { CurrencyPipe } from '../../../pipes/currency-pipe-pipe';
import { RouterLink } from "@angular/router";
import { CartModal } from '../../../services/cart-modal';

@Component({
  selector: 'app-cart-item',
  imports: [QuantityControl, AdditionalServices, CurrencyPipe, RouterLink],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  item = input.required<CartGoodsType>();
  cartModal = inject(CartModal);

  remove = output<void>();
}
