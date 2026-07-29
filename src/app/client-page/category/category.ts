import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Goods } from '../../services/goods';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class CategoryComponent {

  @Output()
  selectedCategory = new EventEmitter<string>();

  currentCategory = 'Усі';

  goodsService = inject(Goods);
  categories = this.goodsService.categoriesGoods;

  selectCategory(category: string) {

    this.currentCategory = category;

    this.selectedCategory.emit(category);

  }

}