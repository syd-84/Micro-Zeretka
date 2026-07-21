import { Component, inject } from '@angular/core';
import { Goods } from '../services/goods';
import { HeaderComponent } from '../header/header';
import { CategoryComponent } from './category/category';
import { SliderComponent } from './slider/slider';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    HeaderComponent,
    CategoryComponent,
    SliderComponent

  ],
  templateUrl: './client-page.html',
  styleUrl: './client-page.css'
})
export class ClientPage {
  goods = inject(Goods);

products = this.goods.currentGoods();

firstSlider = this.products.slice(0,5);

secondSlider = this.products.slice(5,10);

thirdSlider = this.products.slice(10);
}