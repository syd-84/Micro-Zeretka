import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Search } from '../search/search';
import { Router } from "@angular/router";
import { Exchange } from "../exchange/exchange";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, Search, Exchange],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  searchQuery: string = '';
  router = inject(Router);

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToLogin() {
    this.router.navigate(['login'])
  }
}