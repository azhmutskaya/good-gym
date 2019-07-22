import { Pipe, PipeTransform } from '@angular/core';
import { Filter, Range, Dependency } from '../interfaces/filter';

@Pipe({
  name: 'filterBy',
  pure: false
})

export class FilterPipe implements PipeTransform {

  private searchFilter(fields, params): <T>(item: T) => boolean {
    return <T>(item: T): boolean => {
      const currentParams = [...params];
      if (!currentParams.length) {
        return true;
      }
      return fields.some((field: string): boolean => {
        if (item[field] === null) {
          return false;
        }
        return currentParams.every((param, index): boolean => {
          if (currentParams.length === 0) {
            return true;
          }
          if (index === (params.length - 1)) {
            if (this.filterByString(item[field], param)) {
              currentParams.splice(index, 1);
              return true;
            }
          }
          if (this.filterByFullString(item[field], param)) {
            currentParams.splice(index, 1);
            return true;
          }
        });
      });
    };
  }

  private filterByFields(dependencies: Dependency[]): <T>(item: T) => boolean {
    return <T>(item: T): boolean => {
      return dependencies.every((dependency) => {
        if (item[dependency.field] === null) {
          if (!dependency.fullEntry) {
            return true;
          }
          return dependency.param === null;
        }
        switch (typeof dependency.param) {
          case 'boolean':
            return this.filterByDefault(!!item[dependency.field], dependency.param);
          case 'number':
            return this.filterByDefault(+item[dependency.field], dependency.param);
          case 'string':
            if (dependency.fullEntry) {
              return this.filterByFullString(item[dependency.field], dependency.param);
            }
            return this.filterByString(item[dependency.field], dependency.param);
          case 'object':
            if (dependency.param === null) {
              if (dependency.fullEntry) {
                return this.filterByDefault(item[dependency.field], null);
              }
              return true;
            }
            if (dependency.param instanceof Date) {
              return this.filterByDefault(this.transformDate(item[dependency.field]), this.transformDate(dependency.param));
            }
            if (Array.isArray(dependency.param)) {
              return false; // type or maybe late
            }
            return this.filterByRange(item[dependency.field], dependency.param);
          default:
            console.error('Something went wrong');
            return true;
        }
      });
    };
  }

  private filterByFullString(currentValue: string, compareValue: string): boolean {
    return currentValue.toString().toLowerCase().localeCompare(compareValue.toString().toLowerCase()) === 0;
  }

  private filterByString(currentValue: string, compareValue: string): boolean {
    return currentValue.toString().toLowerCase().indexOf(compareValue.toString().toLowerCase()) !== -1;
  }

  private filterByDefault(currentValue: boolean | number | null, compareValue: boolean | number | null): boolean {
    return currentValue === compareValue;
  }

  private filterByRange(currentValue: number | Date | null, range: Range): boolean {
    if ((range.from instanceof Date) || (range.to instanceof Date)) {
      if (range.from instanceof Date) {
        range.from = this.transformDate(range.from);
      }
      if (range.to instanceof Date) {
        range.to = this.transformDate(range.to);
      }
    }

    if (!range.from || !range.to) {
      return true;
    }
    if (!range.from) {
      return currentValue <= range.to;
    }
    if (!range.to) {
      return currentValue >= range.from;
    }
    return (currentValue >= range.from) && (currentValue <= range.to);
  }

  private transformDate(date: Date): number {
    return date.setHours(0, 0, 0, 0);
  }

  transform<T>(items: T[], filter: Filter | null): T[] {
    if (!filter) {
      return items;
    }
    if (filter.strictDependency) {
      if (filter.fields || filter.params) {
        console.error('Incorrect format of data. Use array of dependency');
      }
      if (!filter.dependency || !filter.dependency.length || filter.fields || filter.params) {
        return items;
      }
      return items.filter(this.filterByFields(filter.dependency));
    } else {
      if (filter.dependency) {
        console.error('Incorrect format of data. Use array of dependency only for "strictDependency: true"');
      }
      if (!filter.params || filter.dependency) {
        return items;
      }
      return items.filter(this.searchFilter(filter.fields, filter.params));
    }
  }
}
