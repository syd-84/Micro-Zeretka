import { Component, inject } from '@angular/core';
import { Goods, GoodsType } from '../services/goods';
import { Button } from "../button/button";
import { Comments } from "./comments/comments";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [Button, Comments],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  goods = inject(Goods);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router)

  product?: GoodsType | undefined;

  goToMainPage() {
    this.router.navigate([''])
  }

  addToCart(prod: GoodsType) {
    this.goods.addToCart(prod)
  }

  constructor() {
    this.product = this.goods.goods[0];

    this.activeRoute.params.subscribe(params => {
      this.product = this.goods.currentGoods().find(el => el.id === params['id'])
    })
  }
}
