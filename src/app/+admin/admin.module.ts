import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconSpriteModule } from 'ng-svg-icon-sprite';

import { AdminRoutingModule } from './admin-routing.module';
import { ClientsModule } from './modules/+clients/clients.module';
import { SubscriptionsModule } from './modules/+subscriptions/subscriptions.module';
import { LoginModule } from './modules/+login/login.module';

import { AdminComponent } from './admin.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ClearnLayoutComponent } from './components/clearn-layout/clearn-layout.component';

@NgModule({
  declarations: [AdminComponent, NavigationComponent, ClearnLayoutComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IconSpriteModule,
    ClientsModule,
    SubscriptionsModule,
    LoginModule
  ]
})
export class AdminModule {
}
