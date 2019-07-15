import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { SubscriptionsService } from '../../../../services/subscriptions.service';

import { Clients, ClientsApi } from '../../interfaces/clients';
import { Subscriptions, SubscriptionsApi } from '../../../../interfaces/subscriptions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  clients: Clients[] = [];
  subscriptionsName = {};
  errors = {
    clientsIsLoaded: false,
    subscriptionsIsLoaded: false,
    clientsIsSuccessful: false,
    subscriptionsIsSuccessful: false
  };
  sortKey = '';
  sortType = true;

  private subscriptions: Subscriptions[] = [];

  constructor(
    private clientsService: ClientsService,
    private subscriptionsService: SubscriptionsService
  ) {
  }

  ngOnInit() {

    setTimeout(() => {
      this.getSubscriptions();
    }, 2000);

    setTimeout(() => {
      this.getClients();
    }, 1000);

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

  private getSubscriptions(): void {
    this.subscriptionsService.getJSON().subscribe(
      (data: SubscriptionsApi[]) => {
        data.forEach((item) => {
          const id = item.Id;
          const name = item.Name;
          const cost = +(item.Cost.substring(1));

          this.subscriptions.push({
            id,
            name,
            cost
          });
        });
        this.subscriptions.forEach((item) => {
          this.subscriptionsName[item.id] = item.name;
        });
        this.clients.forEach((item) => {
          item.subscriptionName = this.subscriptionsName[item.subscriptionId];
        });
        this.errors.subscriptionsIsLoaded = true;
        this.errors.subscriptionsIsSuccessful = true;
      },
      () => {
        this.errors.subscriptionsIsLoaded = true;
      });
  }

  private getClients(): void {
    this.clientsService.getJSON().subscribe(
      (data: ClientsApi[]) => {
        data.forEach((item) => {
          const id = item.Id;
          const isActive = item.IsActive;
          const gender = item.Gender;
          const firstName = item.FirstName;
          const lastName = item.LastName;
          const dateOfBirth = new Date(item.DateOfBirth);
          const email = item.Email;
          const phones = item.Phones;
          const address = item.Address;
          const subscriptionId = item.SubscriptionId;
          const subscriptionName = this.subscriptionsName[item.SubscriptionId];
          const expirationDate = new Date(item.ExpirationDate);
          const balance = +item.Balance;

          this.clients.push({
            id,
            isActive,
            gender,
            firstName,
            lastName,
            dateOfBirth,
            email,
            phones,
            address,
            subscriptionId,
            subscriptionName,
            expirationDate,
            balance
          });
        });
        this.errors.clientsIsLoaded = true;
        this.errors.clientsIsSuccessful = true;
      },
      () => {
        this.errors.clientsIsLoaded = true;
      });
  }
}
