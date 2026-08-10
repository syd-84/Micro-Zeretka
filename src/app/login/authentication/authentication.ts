import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPassword } from '../../services/confirm-password';
import { Button } from "../../button/button";
import { Users } from '../../services/users';

@Component({
  selector: 'app-authentication',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './authentication.html',
  styleUrl: './authentication.css',
})
export class Authentication {
  router = inject(Router);
  password = inject(ConfirmPassword);
  usersService = inject(Users);

  formControl = new FormGroup({
    emailControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/)
    ]),
    passwordControl: new FormControl('', [
      Validators.required
    ])
  })

  auth() {
    const email = this.formControl.controls.emailControl.value!;
    const password = this.formControl.controls.passwordControl.value!;
    const authData = { email, password };
    this.usersService.authentication(authData);

    // this.formControl.reset();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter')
      this.auth();
  }

}
