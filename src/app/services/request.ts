import { HttpClient, HttpContext, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CommentType, GoodsType } from './goods';
import { CurrencyType } from './currency';

@Injectable({
  providedIn: 'root',
})
export class RequestApi {
  SERVER_URI = 'http://localhost:3000';
  httpClient = inject(HttpClient);

  getGoodsAll() {
    return httpResource<GoodsType[]>(() => `${this.SERVER_URI}/goods`);
  }

  getGoodsById(id: string) {
    return httpResource<GoodsType[]>(() => `${this.SERVER_URI}/goods/${id}`);
  }

  addGoods(product: GoodsType) {
    return this.httpClient.post(`${this.SERVER_URI}/add_goods`, product);
  }

  deleteGoodsById(id: string) {
    return this.httpClient.delete(`${this.SERVER_URI}/delete_goods/${id}`);
  }

  getCommentsAll() {
    return httpResource<[CommentType]>(() => `${this.SERVER_URI}/comments`);
  }

  addComment(comment: CommentType) {
    return this.httpClient.post(`${this.SERVER_URI}/add_comment`, comment);
  }

  deleteCommentsByProductId(id: string) {
    return this.httpClient.delete(`${this.SERVER_URI}/delete_comments/${id}`);
  }

  getCurrency() {
    return httpResource<CurrencyType[]>(() => `${this.SERVER_URI}/currency`);
  }
}
