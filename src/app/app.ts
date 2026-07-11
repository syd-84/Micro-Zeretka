import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Goods } from './services/goods';
import { Search } from "./search/search";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Search],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Micro-Zeretka');
  goods = inject(Goods)
  ngOnInit() {
    if (!localStorage.getItem('goods')) {
      localStorage.clear();
      localStorage.setItem('goods', JSON.stringify(this.goods.goods));
      localStorage.setItem('comments', '[]');
    } else {
      this.goods.currentGoods.set(JSON.parse(localStorage.getItem('goods')!));
      this.goods.comments.set(JSON.parse(localStorage.getItem('comments')!));
    }
  }
}
