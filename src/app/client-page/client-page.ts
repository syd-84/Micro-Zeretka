import { Component, computed, inject, signal } from '@angular/core';
import { Goods, GoodsType } from '../services/goods';
import { CategoryComponent } from './category/category';
import { SliderComponent } from './slider/slider';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CategoryComponent,
    SliderComponent,
  ],
  templateUrl: './client-page.html',
  styleUrl: './client-page.css'
})
export class ClientPage {

  goods = inject(Goods);
  categoryGoods = this.goods.categoriesGoods;

  products = computed(() => {
    return this.goods.currentGoods();
  });

  newestProducts = computed(() => {
    return this.products();
  });

  oldestProducts = computed(() => {
    return this.products() ? [...this.products()!].reverse() : [];
  });


  filteredProducts = signal<GoodsType[]>([])


  selectedCategory = 'Усі';
  nameCategory = 'Усі';

  changeCategory(category: string) {

    this.selectedCategory = category;

    if (category === 'Усі') {
      this.filteredProducts.set(this.products());
      return;

    } else {
      this.nameCategory = this.categoryGoods.find(el => el.category === this.selectedCategory)!.name
    }

    this.filteredProducts.set(this.products().filter(
      product => product.category === category
    ));
  }

}