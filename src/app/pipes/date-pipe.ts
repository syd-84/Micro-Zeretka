import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(date: Date | undefined): string {
    const minutes = String(date?.getMinutes()).padStart(2, '0');
    const hours = String(date?.getHours()).padStart(2, '0');
    const day = String(date?.getDate()).padStart(2, '0');
    const month = date?.getMonth();
    const year = date?.getFullYear();

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

    return `${(day)} ${monthStr[month!]} ${year} ${hours}:${minutes}`;
  }
}
