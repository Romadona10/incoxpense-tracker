import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value == null || value === '') return '';
    return new Intl.NumberFormat().format(value);
  }

}
