import { Component, inject } from '@angular/core';
import { Button } from "../button/button";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPassword } from '../services/confirm-password';

@Component({
  selector: 'app-login',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  passwordControl = new FormControl('', [Validators.required]);
  router = inject(Router);
  password = inject(ConfirmPassword);

  enter() {
    if (this.passwordControl.value === 'admin') {
      this.password.password.set(this.passwordControl.value);
      this.router.navigate(['admin']);
    }
    this.passwordControl.reset();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter')
      this.enter();
  }
}
