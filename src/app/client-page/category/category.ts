import { Component, EventEmitter, Output } from '@angular/core';

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

  categories = [
    {
      title: 'Усі',
      value: 'Усі'
    },
    {
      title: 'Техніка',
      value: 'technics'
    },
    {
      title: 'Одяг',
      value: 'clothes'
    },
    {
      title: 'Їжа',
      value: 'food'
    },
    {
      title: 'Зоотовари',
      value: 'pet supplies'
    },
    {
      title: 'Побутова хімія',
      value: 'household chemicals'
    }
  ];

  selectCategory(category: string) {

    this.currentCategory = category;

    this.selectedCategory.emit(category);

  }

}