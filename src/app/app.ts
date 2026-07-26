import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Goods } from './services/goods';
import { HeaderComponent } from './header/header';
import { Currency } from './services/currency';
import { LoadingScreen } from "./loading-screen/loading-screen";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoadingScreen],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Micro-Zeretka');
  goods = inject(Goods);
  currency = inject(Currency);
  loadingDisplay = signal('block');

  onClick() {
    console.log('OK');
  }

  constructor() {
    effect(() => {
      const currencyData = this.currency._currency.value();
      // const currencyData = this.currency._currency;
      if (currencyData) {
        this.currency.currency.set(currencyData || []);
      }

      const CurrentGoodsData = this.goods.goods.value();
      if (CurrentGoodsData) {
        this.goods.currentGoods.set(CurrentGoodsData || []);
      }

      const commentsData = this.goods._comments.value();
      if (commentsData) {
        this.goods.comments.set(commentsData || []);
      }

      const cartGoodsData = this.goods._cartGoods.value();
      if (cartGoodsData) {
        this.goods.cartGoods.set(cartGoodsData || []);
      }
    });
  }
}
