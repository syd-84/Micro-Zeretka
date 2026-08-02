import { Component, computed, DestroyRef, effect, ElementRef, inject, input, Input, signal, viewChild } from '@angular/core';
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
  products = input<GoodsType[]>([]);

  slide_tag = viewChild<ElementRef<HTMLDivElement>>('slider');
  destroyRef = inject(DestroyRef);

  visibleCount = 5;
  startIndex = signal(0);
  numberOfProducts = 0;
  slideWidth = signal(0);
  numberOfVisibleSlide = 0;
  maxSlides = 0;
  translateX = computed(() => this.startIndex() * this.slideWidth());

  isResizing = false;
  timeoutResize = 0;

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

  onResize(e: UIEvent) {
    this.isResizing = true;
    clearTimeout(this.timeoutResize);
    this.timeoutResize = setTimeout(() => {
      this.isResizing = false;
    }, 300);

    const element = this.slide_tag()?.nativeElement;
    this.slideWidth.set(element!.clientWidth)
  }

  constructor() {
    effect(() => {
      if (this.products()) this.numberOfProducts = this.products().length;
      this.maxSlides = Math.ceil(this.numberOfProducts / this.visibleCount - 1);
      this.slideWidth.set(this.slide_tag()!.nativeElement.offsetWidth);
    })
  }
}