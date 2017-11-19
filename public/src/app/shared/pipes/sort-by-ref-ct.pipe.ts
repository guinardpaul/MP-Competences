import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByRefCt'
})
export class SortByRefCtPipe implements PipeTransform {

  transform(array: Array<any>, args?: string): any {
    array.sort((a: string, b: string): number => {
      const NUMERIC_REGEXP = /\d+/g;
      if (a[ args ] < b[ args ]) {
        return -1;
      } else if (a[ args ] > b[ args ]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
