import { Pipe, PipeTransform } from '@angular/core';
import { Clients } from '../interfaces/clients';

@Pipe({
  name: 'search',
  pure: false
})

export class SearchPipe implements PipeTransform {

  transform(items: Clients[], searchTerms: string[], searchFields: string[]): any {
    return items.filter((item) => {
      return searchFields.some((searchField) => {
        return searchTerms.some((searchTerm) => {
          return (typeof item[searchField] === 'string') && item[searchField].toLowerCase().indexOf(searchTerm) !== -1;
        });
      });
    });
  }
}
