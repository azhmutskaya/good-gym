import { Input, Component, OnDestroy, OnInit } from '@angular/core';
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

  filterIsActive = false;

  searchIsVisible = false;
  search = new FormControl('');

  private searchParams: Filter = {
    fields: ['firstName', 'lastName', 'subscriptionName'],
    params: null,
    strictDependency: false,
  };

  private searchSubscription;
  private paramsSubscription;

  constructor(private clientsService: ClientsService) {
  }

  ngOnInit() {
    this.onValueChangeSubscription();
    this.onFiltersChangeSubscription();
  }

  searchClient(filterParams: Filter): void {
    this.clientsService.filterClient(filterParams);
  }

  ngOnDestroy() {
    this.searchClient(null); // crutch
    this.searchSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
  }

  toggleSearch() {
    this.searchIsVisible = !this.searchIsVisible;
    if (!this.searchIsVisible) {
      this.filterIsActive = false;
      this.clientsService.openFilter(this.filterIsActive);
      this.search.reset('', {emitEvent: false});
      this.searchClient(null);
    }
  }

  toggleFilter() {
    this.filterIsActive = !this.filterIsActive;
    this.clientsService.openFilter(this.filterIsActive);
  }

  onValueChangeSubscription() {
    this.searchSubscription = this.search.valueChanges.pipe(
      map((value: string) => value.trim()),
      debounceTime(300),
      distinctUntilChanged((x: string, y: string) => x === y)
    ).subscribe((searchTerm: string) => {
      this.searchParams.params = searchTerm.split(/\s+/);
      this.searchClient(this.searchParams);
    });
  }

  onFiltersChangeSubscription() {
    this.paramsSubscription = this.clientsService.filterClientsParam.subscribe((searchParams) => {
      if (searchParams && !searchParams.fields && this.search.value) {
        this.search.reset('', {emitEvent: false});
      }
    });
  }

}
