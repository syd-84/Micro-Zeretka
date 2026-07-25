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

  constructor() {
    effect(() => {
      const data = this.currency._currency;
      if (data) {
        this.currency.currency.set(data);
      }
    })

    setTimeout(() => {
      this.loadingDisplay.set('none');
    }, 2000)


    if (!localStorage.getItem('goods')) {
      localStorage.clear();
      localStorage.setItem('goods', JSON.stringify(this.goods.goods));
      localStorage.setItem('comments', '[]');
      localStorage.setItem('cart', '[]');
    } else {
      this.goods.currentGoods.set(JSON.parse(localStorage.getItem('goods')!));
      this.goods.comments.set(JSON.parse(localStorage.getItem('comments')!));
      // this.goods.cartGoods.set(JSON.parse(localStorage.getItem('cart')!));
    }
  }

  // ngOnInit() {
  //   if (!localStorage.getItem('goods')) {
  //     localStorage.clear();
  //     localStorage.setItem('goods', JSON.stringify(this.goods.goods));
  //     localStorage.setItem('comments', '[]');
  //     localStorage.setItem('cart', '[]');
  //   } else {
  //     this.goods.currentGoods.set(JSON.parse(localStorage.getItem('goods')!));
  //     this.goods.comments.set(JSON.parse(localStorage.getItem('comments')!));
  //     this.goods.cartGoods.set(JSON.parse(localStorage.getItem('cart')!));

  //     console.log(this.goods.cartGoods);
  //   }
  // }
}
