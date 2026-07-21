import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { GoodsType } from '../../services/goods';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {

  product = input.required<GoodsType>();

  private router = inject(Router);

  openProduct() {
    this.router.navigate(['/product', this.product().id]);
  }

}