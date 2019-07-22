import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ClientsService } from '../../services/clients.service';
import { Filter } from '../../interfaces/filter';
import { debounceTime } from 'rxjs/operators';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from 'saturn-datepicker';


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class FiltersComponent implements OnInit, OnDestroy {
  @Input() subscriptions;
  @Input() subscriptionsName;
  @Input() errors;

  filterIsActive = false;

  todayDate = new Date(Date.now());
  minDate = new Date(this.todayDate.getFullYear() - 100, 0, 1);
  maxDate = new Date(this.todayDate.getFullYear() + 100, 0, 1);

  clientFilter = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    isActive: [null],
    subscriptionId: [null],
    expirationDate: [{begin: null, end: null}]
  });

  private filterSubscription;
  private paramsSubscription;
  private filtersToggleSubscription;

  private filterParams: Filter = {
    strictDependency: true
  };
  private isReset = true;

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService
  ) {
  }

  ngOnInit() {
    this.onValueChangeSubscription();
    this.onFiltersChangeSubscription();
    this.onFiltersToggle();
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
    this.paramsSubscription.unsubscribe();
    this.filtersToggleSubscription.unsubscribe();
  }

  trimField([key, index]: [string, number?]): void {
    const control = (index !== undefined)
      ? this.clientFilter.get(key).get(`${index}`)
      : this.clientFilter.get(key);

    if (typeof control.value !== 'object') {
      control.setValue(control.value.trim());
    }
  }

  isFilled([key, index]: [string, number?]): boolean {
    const control = (index !== undefined)
      ? this.clientFilter.get(key).get(`${index}`)
      : this.clientFilter.get(key);

    return (typeof control.value !== 'object') && control.value.trim();
  }

  filterClient(filterParams: Filter): void {
    this.clientsService.filterClient(filterParams);
  }

  resetFilters() {
    this.isReset = true;
    this.clientFilter.reset({
      firstName: '',
      lastName: '',
      isActive: null,
      subscriptionId: null,
      expirationDate: {begin: null, end: null}
    }, {emitEvent: false});
    this.clientFilter.get('expirationDate').setValue({begin: null, end: null}); // crutch for sat datepicker
    this.filterClient(null);
  }

  onFiltersToggle() {
    this.filtersToggleSubscription = this.clientsService.filterIsAcive.subscribe(state => {
      this.filterIsActive = state;
      if (!this.filterIsActive) {
        this.resetFilters();
      }
    });
  }

  onValueChangeSubscription() {
    this.filterSubscription = this.clientFilter.valueChanges.pipe(
      debounceTime(300),
    ).subscribe((clientsFilter) => {
      if (clientsFilter.expirationDate === null) { // crutch for sat datepicker
        this.clientFilter.get('expirationDate').setValue({begin: null, end: null});
        clientsFilter.expirationDate = {
          begin: null,
          end: null
        };
      }
      this.filterParams.dependency = [];
      for (const property in clientsFilter) {
        if (clientsFilter.hasOwnProperty(property)) {
          let fullEntry = false;
          if (property === 'isActive' && clientsFilter[property] === false) {
            clientsFilter.isActive = null;
          }
          if (property === 'expirationDate') {
            clientsFilter.expirationDate = {
              from: clientsFilter.expirationDate.begin && new Date(clientsFilter.expirationDate.begin),
              to: clientsFilter.expirationDate.end && new Date(clientsFilter.expirationDate.end)
            };
          }
          if (property === 'subscriptionId') {
            if (clientsFilter[property] !== 'All' && clientsFilter[property] !== null) {
              fullEntry = true;
            }
            if (clientsFilter[property] === 'None' || clientsFilter[property] === 'All') {
              clientsFilter.subscriptionId = null;
            }
          }
          this.filterParams.dependency.push({
            field: property,
            param: clientsFilter[property],
            fullEntry
          });
        }
      }
      this.isReset = false;
      this.filterClient(this.filterParams);
    });
  }

  onFiltersChangeSubscription() {
    this.paramsSubscription = this.clientsService.filterClientsParam.subscribe((filterParams) => {
      if (filterParams && !filterParams.dependency && !this.isReset) {
        this.isReset = true;
        this.clientFilter.reset({
          firstName: '',
          lastName: '',
          isActive: null,
          subscriptionId: null,
          expirationDate: {begin: null, end: null}
        }, {emitEvent: false});
      }
    });
  }
}
