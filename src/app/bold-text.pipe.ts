import {Pipe, PipeTransform, Sanitizer} from '@angular/core';

@Pipe({
  name: 'boldText'
})
export class BoldTextPipe implements PipeTransform {

  constructor() {}

  transform(value: string, regex: string): any {
    return value.replace(new RegExp(`(${regex})`, 'gi'), '<b>$1</b>');
  }
}
