import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminForm } from './admin-form/admin-form';
import { AdminList } from './admin-list/admin-list';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, AdminForm, AdminList],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})

export class Admin {

}
