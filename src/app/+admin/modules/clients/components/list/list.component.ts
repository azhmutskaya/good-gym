import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';
import { Clients } from '../../interfaces/clients';
import { ClientsService } from '../../services/clients.service';
import { Filter } from '../../interfaces/filter';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({transform: 'translateY(-40px)', opacity: 0}),
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({transform: 'translateY(0)', opacity: 1}))
      ])
    ]),
    trigger('list', [
      transition(':enter', [
        query('@items', stagger(100, animateChild()))
      ]),
    ])
  ]
})

export class ListComponent implements OnInit, OnDestroy {

  @Input() clients;
  @Input() subscriptions;
  @Input() subscriptionsName;
  @Input() errors;

  sortKey = '';
  sortType = true;

  filter: Filter;

  private clientsFilterSubscribe;

  constructor(private clientsService: ClientsService) {
  }

  ngOnInit() {
    this.clientsFilterSubscribe = this.clientsService.filterClientsParam.subscribe((filter) => {
      this.filter = filter;
    });
  }

  ngOnDestroy() {
    this.clientsFilterSubscribe.unsubscribe();
  }

  editClient(client: Clients): void {
    this.clientsService.editClient(client);
  }

  sortClients(key): void {
    key = key === 'subscriptions'
      ? this.errors.subscriptionsIsSuccessful
        ? 'subscriptionName'
        : 'subscriptionId'
      : key;

    this.sortType = this.sortKey !== key
      ? true
      : !this.sortType;

    this.sortKey = key;

    this.clients.sort((a, b) => {
      return this.sortType
        ? +(a[key] > b[key]) || -1
        : +(a[key] < b[key]) || -1;
    });
  }
}
