import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmPassword } from '../../services/confirm-password';
import { Button } from "../../button/button";

@Component({
  selector: 'app-authentication',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './authentication.html',
  styleUrl: './authentication.css',
})
export class Authentication {
  router = inject(Router);
  password = inject(ConfirmPassword);

  formControl = new FormGroup({
    emailControl: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/)
    ]),
    passwordControl: new FormControl('', [
      Validators.required
    ])
  })

  enter() {
    if (this.formControl.controls.passwordControl.value === 'admin' && this.formControl.controls.emailControl.value === 'admin') {
      this.password.password.set(this.formControl.controls.passwordControl.value);
      this.router.navigate(['admin']);
      console.log('admin');
    } else {
      console.log('e-mail: ', this.formControl.controls.emailControl.value)
      console.log('password: ', this.formControl.controls.passwordControl.value)
    }

    this.formControl.controls.passwordControl.reset();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Enter')
      this.enter();
  }

}
