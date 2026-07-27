import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Search } from '../search/search';
import { Router, RouterLink } from "@angular/router";
import { Exchange } from "../exchange/exchange";
import { Goods } from '../services/goods';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, Search, Exchange, RouterLink],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  searchQuery: string = '';
  router = inject(Router);
  goodsService = inject(Goods);

  numberOfPurchases = computed(() => this.goodsService.cartGoods().length);

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToLogin() {
    this.router.navigate(['login'])
  }

  goToCart() {
    this.router.navigate(['cart'])
  }
}