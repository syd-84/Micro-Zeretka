import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Search } from '../search/search';
import { Router, RouterLink } from '@angular/router';
import { Exchange } from '../exchange/exchange';
import { Goods } from '../services/goods';
import { CartModal } from '../services/cart-modal';
import { Cart } from '../cart/cart';
import { Users } from '../services/users';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, Search, Exchange, RouterLink, Cart],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  searchQuery: string = '';
  router = inject(Router);
  goodsService = inject(Goods);
  cartModal = inject(CartModal);
  userService = inject(Users);

  numberOfPurchases = computed(() => this.goodsService.cartGoods().length);

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToAdmin() {
    this.router.navigate(['admin']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
    this.isMenuOpen = !this.isMenuOpen;
  }

  logOut() {
    this.userService.logOut();
    this.isMenuOpen = !this.isMenuOpen;
    this.router.navigate(['']);
  }
}
