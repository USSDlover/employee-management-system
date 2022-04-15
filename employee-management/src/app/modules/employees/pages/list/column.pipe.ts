import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'column'
})
export class ColumnPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (value instanceof Date)
      return value.toLocaleDateString();

    return value;
  }

}
