import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ClientsService } from '../../services/clients.service';
import { Filter } from '../../interfaces/filter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchIsVisible = false;
  filterIsActive = false;
  search = new FormControl('');

  private searchParams: Filter = {
    fields: ['firstName', 'lastName', 'subscriptionName'],
    params: null,
    strictDependency: false,
  };

  private searchSubscription;

  constructor(private clientsService: ClientsService) {
  }

  ngOnInit() {
    this.searchSubscription = this.search.valueChanges.pipe(
      map((value: string) => value.trim()),
      debounceTime(1000),
      distinctUntilChanged((x: string, y: string) => x === y)
    ).subscribe((searchTerm: string) => {
      this.searchParams.params = searchTerm.split(/\s+/);
      this.searchClient(this.searchParams);
    });
  }

  searchClient(filterParams: Filter): void {
    this.clientsService.filterClient(filterParams);
  }

  ngOnDestroy() {
    //this.searchParams.dependency.params = null; // crutch
    this.searchSubscription.unsubscribe();
  }

}
