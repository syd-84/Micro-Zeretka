import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Goods, GoodsType } from '../../services/goods';
import { CurrencyPipe } from '../../pipes/currency-pipe-pipe';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})

export class ProductCard {
  goodsService = inject(Goods);

  product = input.required<GoodsType>();

  private router = inject(Router);

  inCart = computed(() => this.goodsService.cartGoods().some(el => el.product.id === this.product().id));

  openProduct() {
    this.router.navigate(['/product', this.product().id]);
  }

  addToCartProduct(prod: GoodsType) {
    this.goodsService.addProductToCart(prod);
    if (this.goodsService.cartGoods().some(el => el.product!)) {
      const prodId = prod.id;
      const cart = this.goodsService.cartGoods().find(el => el.product.id === prodId);
      const cartId = cart?.id
      const quantity = cart?.quantity! + 1;
      this.goodsService.updateQuantityByIdCart(cartId!, quantity)
    }
  }
}