import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';

import { SubscriptionsComponent } from './subscriptions.component';
import { ListComponent } from './components/list/list.component';


@NgModule({
  declarations: [
    SubscriptionsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule
  ]
})
export class SubscriptionsModule {
}
