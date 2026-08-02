import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartModal {
  isOpen = signal(false);

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    console.log('CLOSE');
    this.isOpen.set(false);
  }
}
