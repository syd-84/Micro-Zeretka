import { Component, inject } from '@angular/core';
import { Button } from "../../button/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-empty',
  imports: [Button],
  templateUrl: './cart-empty.html',
  styleUrl: './cart-empty.css',
})
export class CartEmpty {
  router = inject(Router);

  goToMain() {
    this.router.navigate([''])
  }
}
