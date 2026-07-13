import { Component, inject } from '@angular/core';
import { Button } from "../button/button";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  passwordControl = new FormControl('', [Validators.required]);
  router = inject(Router)

  enter() {
    if (this.passwordControl.value === 'admin') {
      this.router.navigate(['admin']);
    }
    this.passwordControl.reset();
  }
}
