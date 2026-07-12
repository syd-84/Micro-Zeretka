import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Search } from '../search/search';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, Search],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  searchQuery: string = '';

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      alert(`Шукаємо: ${this.searchQuery}`);
    }
  }
}