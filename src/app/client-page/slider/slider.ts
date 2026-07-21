import { Component, computed, input, signal } from '@angular/core';
import { GoodsType } from '../../services/goods';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-slider',
  imports: [
    ProductCard
  ],
  templateUrl: './slider.html',
  styleUrl: './slider.css'
})
export class SliderComponent {

  title = input("");
    products = input.required<GoodsType[]>();

    currentIndex = signal(0);

    visibleCount = 3;
    cardWidth = 300;

    offset = computed(() => {
         return this.currentIndex() * this.cardWidth;
    });
    visibleProducts = computed(() => {

    return this.products().slice(

        this.currentIndex(),

        this.currentIndex() + this.visibleCount

    );

});

    next(){

    if(

        this.currentIndex()

        <

        this.products().length - this.visibleCount

    ){

        this.currentIndex.update(v=>v+1);

    }

}

    previous(){

    if(this.currentIndex()>0){

        this.currentIndex.update(v=>v-1);

    }

}


}