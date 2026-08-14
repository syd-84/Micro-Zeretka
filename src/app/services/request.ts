import { HttpClient, HttpContext, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CartGoodsType, CommentType, GoodsType } from './goods';
import { CurrencyType } from './currency';
import { UserType } from './users';

@Injectable({
  providedIn: 'root',
})
export class RequestApi {
  SERVER_URI = 'http://localhost:3000';
  httpClient = inject(HttpClient);

  getGoodsCategoriesAll() {
    return httpResource<GoodsType[]>(() => `${this.SERVER_URI}/goods/categories`);
  }

  getGoodsAll() {
    return httpResource<GoodsType[]>(() => `${this.SERVER_URI}/goods`);
  }

  getGoodsById(id: string) {
    return httpResource<GoodsType[]>(() => `${this.SERVER_URI}/goods/${id}`);
  }

  addGoods(product: GoodsType) {
    return this.httpClient.post(`${this.SERVER_URI}/goods`, product);
  }

  deleteGoodsById(id: string) {
    return this.httpClient.delete(`${this.SERVER_URI}/goods/${id}`);
  }

  getCommentsAll() {
    return httpResource<[CommentType]>(() => `${this.SERVER_URI}/comments`);
  }

  addComment(comment: CommentType) {
    return this.httpClient.post(`${this.SERVER_URI}/comments`, comment);
  }

  deleteCommentsByProductId(id: string) {
    return this.httpClient.delete(`${this.SERVER_URI}/comments/${id}`);
  }

  getCurrency() {
    return httpResource<CurrencyType[]>(() => `${this.SERVER_URI}/currency`);
  }

  getCartGoodsAll() {
    return httpResource<CartGoodsType[]>(() => `${this.SERVER_URI}/cart`);
  }

  addProductToCart(cartProduct: CartGoodsType) {
    return this.httpClient.post(`${this.SERVER_URI}/cart`, cartProduct);
  }

  deleteCartGoodsByProductId(id: string) {
    return this.httpClient.delete(`${this.SERVER_URI}/cart/product/${id}`);
  }

  clearCartGoods() {
    return this.httpClient.delete(`${this.SERVER_URI}/cart`);
  }

  updateCartById(id: string, cartProduct: CartGoodsType) {
    return this.httpClient.post(`${this.SERVER_URI}/cart/${id}`, cartProduct)
  }

  addNewUser(user: UserType) {
    return this.httpClient.post(`${this.SERVER_URI}/registration`, user);
  }

  authentication(authData: { email: string, password: string }) {
    return this.httpClient.post(`${this.SERVER_URI}/auth`, authData);
  }

  getMe() {
    return this.httpClient.get<UserType>(`${this.SERVER_URI}/me`);
  }

  logOut() {
    return this.httpClient.post(`${this.SERVER_URI}/logout`, {});
  }

  checkEmail(email: string) {
    const data = { email: email }
    return this.httpClient.post(`${this.SERVER_URI}/email`, data);
  }

  test() {
    return this.httpClient.get(`${this.SERVER_URI}/test-secure`);
  }
}
