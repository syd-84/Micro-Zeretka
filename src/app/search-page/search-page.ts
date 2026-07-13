import { Component, computed, inject, Query, signal } from '@angular/core';
import { Button } from "../button/button";
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Goods, GoodsType } from '../services/goods';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchPageItem } from "./search-page-item/search-page-item";

@Component({
  selector: 'app-search-page',
  imports: [Button, SearchPageItem],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage {
  goods = inject(Goods);
  currentGoods = signal(this.goods.currentGoods());
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  text = toSignal(this.activeRoute.queryParams.pipe(map(params => params['text'] || '')), { initialValue: '' });

  searchGoods = computed(() => {
    const searchText = this.text().toLowerCase();
    return this.currentGoods().filter(el => el.name.includes(searchText))
  })

  goToMainPage() {
    this.router.navigate(['']);
  }
}
