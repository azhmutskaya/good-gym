import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ClientsComponent } from './modules/clients/clients.component';
import { SubscriptionsComponent } from './modules/subscriptions/subscriptions.component';


const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', component: ClientsComponent },
      { path: 'subscriptions', component: SubscriptionsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {
}
