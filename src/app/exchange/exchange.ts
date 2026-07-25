import { Component, inject } from '@angular/core';
import { Currency } from '../services/currency';

@Component({
  selector: 'app-exchange',
  imports: [],
  templateUrl: './exchange.html',
  styleUrl: './exchange.css',
})
export class Exchange {
  currency_service = inject(Currency);
  denominations = this.currency_service.currencyDenominations;
  currencyKeys = Object.keys(this.denominations);

  changeCurrency(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.currency_service.active_currency.set(target.value);
  }
}
