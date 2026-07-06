import { Component, inject, input } from '@angular/core';
import { Button } from "../../button/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Goods } from '../../services/goods';
import { CommentsList } from "./comments-list/comments-list";

@Component({
  selector: 'app-comments',
  imports: [Button, ReactiveFormsModule, CommentsList],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {
  productId = input<string>();
  goods = inject(Goods);
  comments = this.goods.comments;

  commentControl = new FormGroup({
    comment: new FormControl('', [Validators.required])
  });

  addComment() {
    if (this.commentControl.valid) {
      this.goods.addComment(this.commentControl.controls.comment.value, this.productId())
    }
  }

  ngOnInit() {
    console.log(this.productId());
  }
}
