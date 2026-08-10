import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from "../../button/button";
import { Users, UserType } from '../../services/users';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  router = inject(Router);
  usersService = inject(Users);
  debounceTimer: any;

  formControl = new FormGroup({
    firstNameControl: new FormControl('', [Validators.required,]),
    lastNameControl: new FormControl('', [Validators.required,]),
    emailControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/)
    ]),
    passwordControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    ])
  })

  send() {
    const email = this.formControl.controls.emailControl.value;
    const firstName = this.formControl.controls.firstNameControl.value;
    const lastName = this.formControl.controls.lastNameControl.value;
    const password = this.formControl.controls.passwordControl.value;

    const user: UserType = {
      email: email!.trim().toLowerCase(),
      firstName: firstName!,
      lastName: lastName!,
      password: password!,
      cart: [],
      role: 'custom',
    }

    this.usersService.addNewUser(user);
    this.formControl.reset();
  }

  checkEmail(e: Event) {
    const target = e.target as HTMLInputElement;
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.usersService.checkEmail(target.value);
    }, 500)
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter')
      this.send();
  }
}
