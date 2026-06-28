import { Component, effect, inject } from '@angular/core';
import { Goods } from '../../services/goods';
import { AdminPreviewItem } from '../admin-preview-item/admin-preview-item';

@Component({
  selector: 'app-admin-list',
  imports: [AdminPreviewItem],
  templateUrl: './admin-list.html',
  styleUrl: './admin-list.css',
})
export class AdminList {
  goodsList = inject(Goods);
}
