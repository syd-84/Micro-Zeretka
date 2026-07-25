import { Component, computed, inject, input } from '@angular/core';
import { Button } from "../../button/button";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentType, Goods } from '../../services/goods';
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
  comments = computed(() => this.goods.comments());

  commentForCurrentProduct = computed<CommentType[]>(() => {
    const currentId = this.productId();

    if (!currentId) return [];

    return this.goods.comments().filter(el => el.productId === currentId);
  })

  commentControl = new FormGroup({
    comment: new FormControl('', [Validators.required])
  });

  addComment() {
    if (this.commentControl.valid) {
      this.goods.addComment(this.commentControl.controls.comment.value, this.productId())
    }
  }

  addCommentOnKey(e: KeyboardEvent) {
    if (e.code === 'Enter') {
      this.addComment();
      this.commentControl.reset();
    }

  }
}
