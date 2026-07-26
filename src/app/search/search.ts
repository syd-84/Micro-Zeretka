import { Component, inject, signal } from '@angular/core';
import { Button } from "../button/button";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Goods, GoodsType } from '../services/goods';
import { SearchItem } from "./search-item/search-item";
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [Button, ReactiveFormsModule, SearchItem],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  inputControl = new FormControl('', [Validators.required]);
  goods = inject(Goods);
  searchedGoods = signal<GoodsType[]>([]);
  hideSearchList = true;
  router = inject(Router);

  timer = 0;

  searchGoods(searchText: string | null) {
    let res: GoodsType[] = [];
    if (searchText) {
      for (const element of this.goods.currentGoods()) {
        if (element.name.toLocaleLowerCase().includes(searchText!.trim().toLocaleLowerCase())) {
          res.push(element)
        }
        if (res.length === 5) break
      }
    }
    return res;
  }

  onInput() {
    const query = this.inputControl.value?.trim();
    if (!query) {
      this.hideSearchList = true;
      clearTimeout(this.timer);
      return;
    }

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const results = this.searchGoods(query);
      this.searchedGoods.set(results);
      this.hideSearchList = results.length === 0;
    }, 500);
  }


  onBgClick() {
    this.hideSearchList = true;
  }

  onItemClick() {
    this.inputControl.reset();
    this.hideSearchList = true;
  }

  goToSearch() {
    const query = this.inputControl.value
    if (query) {
      this.hideSearchList = true;
      this.inputControl.reset();
      this.router.navigate(['search'], { queryParams: { text: query } })
    }
  }

  keyEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') this.goToSearch();
  }
}
