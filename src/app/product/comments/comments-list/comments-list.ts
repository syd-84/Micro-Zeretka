import { Component, computed, input } from '@angular/core';
import { CommentType } from '../../../services/goods';
import { DatePipe } from '../../../pipes/date-pipe';

@Component({
  selector: 'app-comments-list',
  imports: [DatePipe],
  templateUrl: './comments-list.html',
  styleUrl: './comments-list.css',
})
export class CommentsList {
  data = input<CommentType>();

  regExp = /кокос|банан|поганий|@/gi;

  replacedText = computed(() => {
    return this.data()?.commentText!.replace(this.regExp, (match) => '*'.repeat(match.length));;
  });
}
