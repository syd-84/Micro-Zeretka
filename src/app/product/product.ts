import { Component, inject } from '@angular/core';
import { Goods, GoodsType } from '../services/goods';
import { Button } from "../button/button";
import { Comments } from "./comments/comments";
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '../pipes/currency-pipe-pipe';

@Component({
  selector: 'app-product',
  imports: [Button, Comments, CurrencyPipe],
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
    this.goods.addProductToCart(prod)
  }

  changeHeight(e: MouseEvent) {
    const element = e.currentTarget as HTMLElement;
    const styles = window.getComputedStyle(element);

    const paddingTop = parseFloat(styles.paddingTop);

    if (!(element.scrollHeight - paddingTop <= element.clientHeight)) {
      element.style.height = element.scrollHeight + 'px';
    }
  }

  changeHeightBack(e: MouseEvent) {
    const element = e.currentTarget as HTMLElement;
    element.style.height = 54 + 'px';
  }

  constructor() {
    this.activeRoute.params.subscribe(params => {
      this.product = this.goods.currentGoods().find(el => el.id === params['id'])
    })

    window.scrollTo({
      top: 0,
    });
  }
}
