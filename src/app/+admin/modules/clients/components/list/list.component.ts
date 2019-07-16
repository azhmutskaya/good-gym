import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() clients;
  @Input() subscriptions;
  @Input() subscriptionsName;
  @Input() errors;

  sortKey = '';
  sortType = true;

  constructor() {
  }

  ngOnInit() {
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
