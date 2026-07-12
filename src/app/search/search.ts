import { Component, inject, signal } from '@angular/core';
import { Button } from "../button/button";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { timeInterval } from 'rxjs';
import { Goods, GoodsType } from '../services/goods';
import { SearchItem } from "./search-item/search-item";

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

  timer = 0;

  searchGoods(searchText: string) {
    let res: GoodsType[] = [];
    if (searchText.trim() !== '') {
      for (const element of this.goods.currentGoods()) {
        if (element.name.toLocaleLowerCase().includes(searchText.trim().toLocaleLowerCase())) {
          res.push(element)
        }
        if (res.length === 5) break
      }
    }
    return res;
  }

  onInput() {
    this.hideSearchList = true;
    if (this.inputControl.value! === '') {
      this.hideSearchList = true;
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.searchedGoods.set(this.searchGoods(this.inputControl.value!));
      this.searchedGoods().length === 0 ? this.hideSearchList = true : this.hideSearchList = false;
    }, 1000)
  }

  onBgClick() {
    this.hideSearchList = true;
  }

  onItemClick() {
    this.inputControl.reset();
    this.hideSearchList = true;
  }
}
