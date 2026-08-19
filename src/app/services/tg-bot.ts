import { inject, Injectable } from '@angular/core';
import { RequestApi } from './request';
import { CartGoodsType } from './goods';

@Injectable({
  providedIn: 'root',
})
export class TgBot {
  request = inject(RequestApi);

  quittance(cartGoods: CartGoodsType[], totalPrice: number): string {
    let text = 'Ваше замовлення:\n------------------\n';
    cartGoods.forEach(element => {
      text += `${element.product.name} - ${element.quantity} шт. - ${element.quantity * element.product.price} грн.\n`
    });
    text += `------------------
Загальна сума: ${totalPrice} грн.`
    return text;
  }

  sendOrder(cartGoods: CartGoodsType[], totalPrice: number) {
    return this.request.sendMessage({ message: this.quittance(cartGoods, totalPrice) });
  }
}
