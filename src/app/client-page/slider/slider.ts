import { Component, Input } from '@angular/core';
import { GoodsType } from '../../services/goods';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './slider.html',
  styleUrl: './slider.css'
})
export class SliderComponent {

  @Input() title = '';

  @Input() products: GoodsType[] = [];

  visibleCount = 5;

  startIndex = 0;

  get visibleProducts(): GoodsType[] {

    return this.products.slice(
      this.startIndex,
      this.startIndex + this.visibleCount
    );

  }

  next() {

    if (
      this.startIndex < this.products.length - this.visibleCount
    ) {

      this.startIndex += 5;

    }

  }

  prev() {

    if (this.startIndex > 0) {

      this.startIndex -= 5;

    }

  }

}