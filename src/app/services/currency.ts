import { inject, Injectable, signal } from '@angular/core';
import { RequestApi } from './request';


export type CurrencyType = {
  base_ccy: string,
  buy: string,
  ccy: string,
  sale: string,
}

@Injectable({
  providedIn: 'root',
})
export class Currency {
  request = inject(RequestApi);

  _currency = this.request.getCurrency();

  currencyDenominations = {
    'UAH': '₴',
    'USD': '$',
    'EUR': '€',
  };

  active_currency = signal('UAH');

  currency = signal<CurrencyType[]>([]);
}
