import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-quantity-control',
  imports: [],
  templateUrl: './quantity-control.html',
  styleUrl: './quantity-control.css',
})
export class QuantityControl {
  quantity = input.required<number>();

  decrease = output<void>();
  increase = output<void>();
}
