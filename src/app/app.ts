import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Admin } from './admin/admin';
import { Product } from "./product/product";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Admin, Product],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Micro-Zeretka');
}
