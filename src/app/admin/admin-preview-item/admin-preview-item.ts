import { Component, inject, input, output, Output } from '@angular/core';
import { Goods, GoodsType } from '../../services/goods';
import { Button } from "../../button/button";

@Component({
  selector: 'app-admin-preview-item',
  imports: [Button],
  templateUrl: './admin-preview-item.html',
  styleUrl: './admin-preview-item.css',
})
export class AdminPreviewItem {
  goods = inject(Goods);
  data = input<GoodsType>();

  hidden = true;

  onClick() {
    this.hidden = !this.hidden;
  }

  delElement(id: string | undefined) {
    this.goods.delGoods(id);
    this.hidden = !this.hidden;
  }
}
