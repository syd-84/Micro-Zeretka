import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button } from "../../button/button";

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  router = inject(Router);

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

  enter() {
    console.log('Ім"я: ', this.formControl.controls.firstNameControl.value)
    console.log('Прізвище: ', this.formControl.controls.lastNameControl.value)
    console.log('e-mail: ', this.formControl.controls.emailControl.value)
    console.log('password: ', this.formControl.controls.passwordControl.value)
    this.formControl.controls.passwordControl.reset();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter')
      this.enter();
  }
}
