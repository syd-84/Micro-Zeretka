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
    this.cartGoods.update(goods => goods?.filter(el => el.product.id !== id));
  }

  // delGoods(id: string | undefined) {
  //   this.currentGoods.update(goods => goods.filter(el => el.id !== id));
  //   this.cartGoods.update(goods => goods.filter(el => el.product.id !== id));
  //   this.comments.update(comments => comments.filter(comment => comment.productId !== id));
  //   localStorage.setItem('goods', JSON.stringify(this.currentGoods()));
  //   localStorage.setItem('cart', JSON.stringify(this.cartGoods()))
  //   localStorage.setItem('comments', JSON.stringify(this.comments()));
  // }


  // ------------ cart --------------

  _cartGoods = this.request.getCartGoodsAll();
  cartGoods = signal<CartGoodsType[]>(this._cartGoods.value()! || [])
  // cartGoods = signal<CartGoodsType[]>(JSON.parse(localStorage.getItem('cart')!) || []);

  addProductToCart(item: GoodsType) {
    const itemIndex = this.cartGoods().findIndex(el => el.product.id === item.id)

    if (itemIndex === -1) {
      const cartItem: CartGoodsType = {
        id: crypto.randomUUID(),
        product: item,
        quantity: 1,
      }

      this.request.addProductToCart(cartItem).subscribe({
        next: () => {
          this._cartGoods.reload();
        }
      });
    }
  }

  deleteCartGoodsById(id: string) {
    this.cartGoods.update(goods => goods.filter(el => el.product.id !== id));
    localStorage.setItem('cart', JSON.stringify(this.cartGoods()))
  }

  clearCart() {
    this.cartGoods.set([])
    localStorage.setItem('cart', JSON.stringify(this.cartGoods()))
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
    this.request.addComment(commmentObj).subscribe({
      next: () => {
        this._comments.reload();
      }
    })
  }
}
