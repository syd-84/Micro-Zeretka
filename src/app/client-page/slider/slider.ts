import { Component, computed, DestroyRef, effect, ElementRef, inject, Input, signal, viewChild } from '@angular/core';
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
  slice_tag = viewChild<ElementRef<HTMLDivElement>>('slider');
  destroyRef = inject(DestroyRef);

  visibleCount = 5;

  startIndex = signal(0);

  numberOfProducts = 0;
  slideWidth = signal(0);
  numberOfVisibleSlide = 0;
  maxSlides = 0;
  translateX = computed(() => this.startIndex() * this.slideWidth());

  next() {
    if (this.startIndex() < this.maxSlides) {
      this.startIndex.update(v => v + 1);
    }
  }

  prev() {
    if (this.startIndex() > 0) {
      this.startIndex.update(v => v - 1);
    }
  }

  constructor() {
    effect(() => {
      if (this.products) this.numberOfProducts = this.products.length;
      this.maxSlides = Math.floor(this.numberOfProducts / 5);
      this.slideWidth.set(this.slice_tag()!.nativeElement.offsetWidth);

      const element = this.slice_tag()?.nativeElement;
      if (!this.slice_tag()?.nativeElement) return;

      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width } = entry.contentRect;
          this.slideWidth.set(width);
        }
      });

      resizeObserver.observe(element!);

      this.destroyRef.onDestroy(() => {
        resizeObserver.disconnect();
      });
    })
  }
}