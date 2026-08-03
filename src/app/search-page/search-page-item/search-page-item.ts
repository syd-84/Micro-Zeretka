import { Component, inject, input } from '@angular/core';
import { Goods, GoodsType } from '../../services/goods';
import { Button } from "../../button/button";
import { RouterLink } from "@angular/router";
import { CurrencyPipe } from '../../pipes/currency-pipe-pipe';

@Component({
  selector: 'app-search-page-item',
  imports: [Button, RouterLink, CurrencyPipe],
  templateUrl: './search-page-item.html',
  styleUrl: './search-page-item.css',
})
export class SearchPageItem {
  data = input<GoodsType>();
  goods = inject(Goods);

  addToCart(data: GoodsType) {
    this.goods.addToCartByProductId(data.id);
  }
}
