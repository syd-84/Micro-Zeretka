import { Component, input, output } from '@angular/core';

import { AdditionalServices } from '../additional-services/additional-services';
import { QuantityControl } from '../quantity-control/quantity-control';
import { CartGoodsType, GoodsType } from '../../../services/goods';
import { CurrencyPipe } from '../../../pipes/currency-pipe-pipe';

@Component({
  selector: 'app-cart-item',
  imports: [QuantityControl, AdditionalServices, CurrencyPipe],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.css',
})
export class CartItem {
  item = input.required<CartGoodsType>();

  increase = output<void>();

  decrease = output<void>();

  remove = output<void>();
}
