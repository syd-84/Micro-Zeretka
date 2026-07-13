import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConfirmPassword {
  password = signal<string | null>(null);

  passwordReset() {
    this.password.set(null);
  }
}
