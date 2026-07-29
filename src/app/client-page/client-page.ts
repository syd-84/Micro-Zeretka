import { Component, inject } from '@angular/core';
import { Goods } from '../services/goods';
import { CategoryComponent } from './category/category';
import { SliderComponent } from './slider/slider';
import { ProductCard } from './product-card/product-card';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CategoryComponent,
    SliderComponent,
    ProductCard
  ],
  templateUrl: './client-page.html',
  styleUrl: './client-page.css'
})
export class ClientPage {

  goods = inject(Goods);

  products = this.goods.currentGoods();

  newestProducts = [...this.products].reverse();

  oldestProducts = [...this.products];

  filteredProducts = this.products;

  selectedCategory = 'Усі';

  changeCategory(category: string) {

    this.selectedCategory = category;

    if (category === 'Усі') {

      this.filteredProducts = this.products;
      return;

    }

    this.filteredProducts = this.products.filter(
      product => product.category === category
    );

  }

}