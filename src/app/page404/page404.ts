import { Component, inject } from '@angular/core';
import { Button } from "../button/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-page404',
  imports: [Button],
  templateUrl: './page404.html',
  styleUrl: './page404.css',
})
export class Page404 {
  router = inject(Router)

  goToMainPage() {
    this.router.navigate([''])
  }
}
