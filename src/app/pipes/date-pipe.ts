import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(num: String | Number | undefined): string {
    const date = new Date(Number(num))
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const monthStr = [
      'січ',
      'лют',
      'бер',
      'кві',
      'тра',
      'чер',
      'лип',
      'сер',
      'вер',
      'жов',
      'лис',
      'гру',
    ]

    return `${year}-${monthStr[Number(month)]}-${day}, ${hours}:${minutes}`;
  }
}
