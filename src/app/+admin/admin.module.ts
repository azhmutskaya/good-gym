import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconSpriteModule } from 'ng-svg-icon-sprite';

import { AdminRoutingModule } from './admin-routing.module';
import { ClientsModule } from './modules/clients/clients.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';

import { AdminComponent } from './admin.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [AdminComponent, NavigationComponent],
  imports: [
    CommonModule,
    IconSpriteModule,
    AdminRoutingModule,
    ClientsModule,
    SubscriptionsModule
  ]
})
export class AdminModule {
}
