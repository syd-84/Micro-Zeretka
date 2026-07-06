import { Component, inject } from '@angular/core';
import { Goods } from '../services/goods';
import { Button } from "../button/button";
import { Comments } from "./comments/comments";

@Component({
  selector: 'app-product',
  imports: [Button, Comments],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  goods = inject(Goods);

  product = this.goods.goods[0];

  // constructor() {
  //   console.log(this.product)
  // }
}
