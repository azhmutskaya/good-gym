import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconSpriteModule } from 'ng-svg-icon-sprite';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatNativeDateModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { ClientsModule } from './modules/clients/clients.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';


@NgModule({
  declarations: [AdminComponent, NavigationComponent],
  imports: [
    CommonModule,
    IconSpriteModule,
    ClientsModule,
    SubscriptionsModule,
    AdminRoutingModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
  providers: [
    MatNativeDateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
  ],
})
export class AdminModule {
}
