import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Admin } from './admin/admin';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Admin],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Micro-Zeretka');
}
