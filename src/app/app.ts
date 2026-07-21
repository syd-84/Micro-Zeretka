import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Goods } from './services/goods';
import { HeaderComponent } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Micro-Zeretka');
  goods = inject(Goods);

  constructor() {
    effect(() => {
      const data = this.goods.goods.value();
      if (data) {
        this.goods.currentGoods.set(data);
      }
    });

    effect(() => {
      const data = this.goods._comments.value();
      if (data) {
        this.goods.comments.set(data);
      }
    });
  }

  onClick() {
    console.log('OK');
  }
}
