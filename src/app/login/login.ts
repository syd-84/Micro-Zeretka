import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Authentication } from "./authentication/authentication";
import { Registration } from "./registration/registration";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Authentication, Registration],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
