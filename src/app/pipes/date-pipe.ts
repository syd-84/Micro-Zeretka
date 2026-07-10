import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(date: String | undefined): string {
    const year = date?.slice(1, 5);
    const month = date?.slice(6, 8);
    const day = date?.slice(9, 11);
    const time=date?.slice(12,17)
    
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

    return `${year}-${monthStr[Number(month)-1]}-${day} ${time}`;
  }
}
