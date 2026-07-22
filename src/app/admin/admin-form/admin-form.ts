import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { imageUrlValidator } from '../../shared/image-url-validator.directive';
import { Goods, GoodsType } from '../../services/goods';
import { Button } from "../../button/button";
import { Currency } from '../../services/currency';

@Component({
  selector: 'app-admin-form',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './admin-form.html',
  styleUrl: './admin-form.css',
})

export class AdminForm {
  adminFormControl = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яІіЇїЄєҐґ\s]+$/)]),
    description: new FormControl("", [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яІіЇїЄєҐґ\d\s]+$/)]),
    imgSrc: new FormControl("", {
      validators: [
        Validators.required
      ],
      asyncValidators: [
        imageUrlValidator()
      ],
      updateOn: 'blur'
    }),
    price: new FormControl("", [Validators.required, Validators.pattern(/^\d+$/)]),
    currency: new FormControl('UAH'),
    category: new FormControl('default', [Validators.pattern(/^(?!default)/)]),
  })

  goods = inject(Goods);
  categoriesGoods = this.goods.categoriesGoods;

  currency = inject(Currency);

  addProduct() {
    let newGoods: GoodsType;
    let priceDefault = Number(this.adminFormControl.controls.price.value!);
    if (this.adminFormControl.controls.currency.value !== 'UAH') {
      const currencySelected = +(this.currency.currency().filter(el => el.ccy === this.adminFormControl.controls.currency.value)[0].sale);
      priceDefault = Math.round(priceDefault * currencySelected);
    }
    newGoods = {
      id: crypto.randomUUID(),
      name: this.adminFormControl.controls.name.value!,
      description: this.adminFormControl.controls.description.value!,
      imgSrc: this.adminFormControl.controls.imgSrc.value!,
      price: priceDefault,
      category: this.adminFormControl.controls.category.value!
    };
    this.goods.currentGoods.update(good => [...good, newGoods])
    localStorage.setItem('goods', JSON.stringify(this.goods.currentGoods()));
  }
}
