import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionsComponent } from './subscriptions.component';

const subscriptionsRoutes: Routes = [
  {
    path: '', component: SubscriptionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(subscriptionsRoutes)],
  exports: [RouterModule]
})

export class SubscriptionsRoutingModule {
}
