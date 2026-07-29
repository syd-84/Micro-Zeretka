import { Component, input } from '@angular/core';
import { GoodsType } from '../../services/goods';
import { RouterLink } from "@angular/router";
import { CurrencyPipe } from '../../pipes/currency-pipe-pipe';

@Component({
  selector: 'app-search-item',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './search-item.html',
  styleUrl: './search-item.css',
})

export class SearchItem {
  data = input<GoodsType>();
}
