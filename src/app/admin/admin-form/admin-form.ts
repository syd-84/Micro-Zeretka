import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValueChangeEvent } from '@angular/forms';
import { imageUrlValidator } from '../../shared/image-url-validator.directive';
import { Goods, GoodsType } from '../../services/goods';

@Component({
  selector: 'app-admin-form',
  imports: [ReactiveFormsModule],
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

  onClick() {
    let newGoods: GoodsType;
    newGoods = {
      id: crypto.randomUUID(),
      name: this.adminFormControl.controls.name.value!,
      description: this.adminFormControl.controls.description.value!,
      imgSrc: this.adminFormControl.controls.imgSrc.value!,
      price: Number(this.adminFormControl.controls.price.value!),
      category: this.adminFormControl.controls.category.value!
    };
    this.goods.currentGoods.update(good => [...good, newGoods])
  }
}
