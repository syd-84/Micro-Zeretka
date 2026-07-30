import { computed, inject, Pipe, PipeTransform, signal } from '@angular/core';
import { Currency } from '../services/currency';

@Pipe({
  name: 'currencyPipe',
  pure: false,
})
export class CurrencyPipe implements PipeTransform {
  currency = inject(Currency);
  denominations = this.currency.currencyDenominations;
  currencyKey = computed(() => this.currency.active_currency() as keyof typeof this.denominations);

  transform(value: number): string {
    let res: Number;
    if (this.currencyKey() === 'UAH') {
      res = value;
    } else {
      const currencyValue = this.currency.currency().filter(el => el.ccy === this.currencyKey())[0].sale;
      res = +(value / Number(currencyValue)).toFixed(2);
    }

    return `${res.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))(?<!\.\d*)/g, ' ').replace('.', ',').replace(/,00/, '')} ${this.denominations[this.currencyKey()]}`;
  }
}
