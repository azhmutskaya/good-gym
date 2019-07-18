import { Component, OnInit } from '@angular/core';
import { Subscriptions, SubscriptionsApi } from '../../interfaces/subscriptions';
import { SubscriptionsService } from '../../services/subscriptions.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  subscriptions: Subscriptions[] = [];
  errors = {
    subscriptionsIsLoaded: false,
    subscriptionsIsSuccessful: false
  };

  constructor(
    private subscriptionsService: SubscriptionsService
  ) {
  }

  ngOnInit() {

    setTimeout(() => {
      this.getSubscriptions();
    }, 1000);

  }

  private getSubscriptions(): void {
    this.subscriptionsService.getSubscriptions().subscribe(
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
        this.errors.subscriptionsIsLoaded = true;
        this.errors.subscriptionsIsSuccessful = true;
      },
      () => {
        this.errors.subscriptionsIsLoaded = true;
      });
  }

}
