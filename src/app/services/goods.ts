import { inject, Injectable, signal } from '@angular/core';
import { RequestApi } from './request';

export type GoodsType = {
  id: string,
  name: string,
  description: string,
  imgSrc: string,
  price: number,
  category: string,
}

export type CommentType = {
  id: string,
  commentText: string | null,
  date: number,
  productId: string | undefined,
  userId: string,
}

@Injectable({
  providedIn: 'root',
})

export class Goods {

  // -------------- goods -------------------

  request = inject(RequestApi);

  categoriesGoods = [
    { category: 'technics', name: 'Техніка та інструменти' },
    { category: 'clothes', name: 'Одяг та взуття' },
    { category: 'food', name: 'Їжа та напої' },
    { category: 'pet supplies', name: 'Зоотовари' },
    { category: 'household chemicals', name: 'Побутова хімія' }
  ]

  goods = this.request.getGoodsAll();
  currentGoods = signal<GoodsType[]>(this.goods.value()!);

  addGoods(product: GoodsType) {
    const req = this.request.addGoods(product).subscribe({
      next: () => {
        this.goods.reload();
      }
    });
  }

  delGoods(id: string | undefined) {
    const delGoods = this.request.deleteGoodsById(id!).subscribe({
      next: () => {
        this.goods.reload();
      }
    })
    const delComments = this.request.deleteCommentsByProductId(id!).subscribe({
      next: () => {
        this._comments.reload();
      }
    })
    this.cartGoods.update(goods => goods.filter(el => el.product.id !== id));
  }



  cartGoods = signal<{ id: string, product: GoodsType }[]>([]);

  addProductToCart(item: GoodsType) {
    const itemIndex = this.cartGoods().findIndex(el => el.product === item)

    if (itemIndex == -1) {
      const cartItem = {
        id: crypto.randomUUID(),
        product: item,
      }

      this.cartGoods.update(arr => [...arr, cartItem]);
    }
  }


  // ------------ comments --------------
  _comments = this.request.getCommentsAll();
  comments = signal<CommentType[]>(this._comments.value()!);

  addComment(text: string | null, productId: string | undefined) {
    const date = Date.now();
    let commmentObj = {
      id: crypto.randomUUID(),
      commentText: text,
      date: Number(date),
      productId: productId,
      userId: "User",
    }
    this.request.addComment(commmentObj).subscribe({
      next: () => {
        this._comments.reload();
      }
    })
  }
}
