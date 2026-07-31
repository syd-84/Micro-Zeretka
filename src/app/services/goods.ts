import { inject, Injectable, signal } from '@angular/core';
import { RequestApi } from './request';
import { take } from 'rxjs';

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

export type CartGoodsType = {
  id: string,
  product: GoodsType,
  quantity: number,
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
    { category: 'pet-supplies', name: 'Зоотовари' },
    { category: 'household-chemicals', name: 'Побутова хімія' }
  ]

  goods = this.request.getGoodsAll();
  currentGoods = signal<GoodsType[]>(this.goods.value()!);

  getAllGoods() {
    this.goods.reload();
  }

  addGoods(product: GoodsType) {
    this.request.addGoods(product).pipe(take(1)).subscribe({
      next: () => {
        this.goods.reload();
      }
    });
  }

  delGoods(id: string | undefined) {
    this.request.deleteGoodsById(id!).pipe(take(1)).subscribe({
      next: () => {
        this.goods.reload();
      }
    })
    this.deleteCommentsByProductId(id!);
    this.deleteCartGoodsProductById(id!);
  }

  // ------------ cart --------------

  _cartGoods = this.request.getCartGoodsAll();
  cartGoods = signal<CartGoodsType[]>(this._cartGoods.value()! || [])

  addProductToCart(item: GoodsType) {
    const itemIndex = this.cartGoods().findIndex(el => el.product.id === item.id)

    if (itemIndex === -1) {
      const cartItem: CartGoodsType = {
        id: crypto.randomUUID(),
        product: item,
        quantity: 1,
      }

      this.request.addProductToCart(cartItem).pipe(take(1)).subscribe({
        next: () => {
          this._cartGoods.reload();
        }
      });
    }
  }

  deleteCartGoodsProductById(id: string) {
    const cartId = this.cartGoods().find(el => el.product.id === id)?.id;
    if (cartId) {
      this.request.deleteCartGoodsById(cartId!).pipe(take(1)).subscribe({
        next: () => {
          this._cartGoods.reload();
        }
      })
    }
  }

  clearCart() {
    this.request.clearCartGoods().pipe(take(1)).subscribe({
      next: () => {
        this._cartGoods.reload();
      }
    })
  }

  placeOrder() {
    this.clearCart();
    console.log('order done');
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
    this.request.addComment(commmentObj).pipe(take(1)).subscribe({
      next: () => {
        this._comments.reload();
      }
    })
  }

  deleteCommentsByProductId(id: string) {
    if (this.comments().some(el => el.productId === id)) {
      this.request.deleteCommentsByProductId(id).pipe(take(1)).subscribe({
        next: () => {
          this._comments.reload();
        }
      })
    }
  }
}
