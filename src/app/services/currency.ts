import { inject, Injectable, signal } from '@angular/core';

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

  currencyDenominations = {
    'UAH': '₴',
    'USD': '$',
    'EUR': '€',
  };

  active_currency = signal('UAH');

  _currency = <CurrencyType[]>[
    {
      base_ccy: "UAH",
      buy: "50.70000",
      ccy: "EUR",
      sale: "51.54639",
    },
    {
      base_ccy: "UAH",
      buy: "44.45000",
      ccy: "USD",
      sale: "45.04505",
    }
  ];

  currency = signal<CurrencyType[]>(this._currency);
}
