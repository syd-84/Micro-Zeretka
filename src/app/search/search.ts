import { Component } from '@angular/core';
import { Button } from "../button/button";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  inputControl = new FormControl('', [Validators.required])
}
