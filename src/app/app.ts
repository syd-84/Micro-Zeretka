import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Goods } from './services/goods';
import { HeaderComponent } from './header/header';
import { Currency } from './services/currency';
import { LoadingScreen } from "./loading-screen/loading-screen";
import { FooterComponent } from "./footer/footer";
import { RequestApi } from './services/request';
import { Users } from './services/users';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoadingScreen, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Micro-Zeretka');
  goods = inject(Goods);
  currency = inject(Currency);
  loadingDisplay = signal('block');
  request = inject(RequestApi);
  router = inject(Router);
  userService = inject(Users);


  onClick() {
    this.userService.getMe();
    console.log(this.userService.user());
  }


  constructor() {
    setTimeout(() => {
      this.loadingDisplay.set('none');
    }, 2000)

    effect(() => {
      const getMe = this.userService.getMe();

      const categories = this.goods._categoriesGoods.value();
      if (categories) {
        this.goods.categoriesGoods.set(categories || [])
      }

      const currencyData = this.currency._currency.value();
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
