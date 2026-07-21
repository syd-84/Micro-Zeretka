import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { CategoryComponent } from './category/category';
import { SliderComponent } from './slider/slider';
import { Product } from '../product/product';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    HeaderComponent,
    CategoryComponent,
    SliderComponent,
    Product

  ],
  templateUrl: './client-page.html',
  styleUrl: './client-page.css'
})
export class ClientPage {

}