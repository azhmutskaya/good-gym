import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  formIsVisible = false;
  filterIsActive = false;
  search = new FormControl('');

  private searchSubscription;

  constructor(private clientsService: ClientsService) {
  }

  ngOnInit() {
    this.searchSubscription = this.search.valueChanges.pipe(
      map((value: string) => value.trim()),
      debounceTime(300),
      distinctUntilChanged((x: string, y: string) => x === y)
    ).subscribe((value: string) => {
      this.searchClient(value.toLowerCase().split(/\s+/));
    });
  }

  searchClient(searchTerms: string[]): void {
    this.clientsService.searchClient(searchTerms);
  }

  ngOnDestroy() {
    this.searchClient(['']); // crutch
    this.searchSubscription.unsubscribe();
  }

}
